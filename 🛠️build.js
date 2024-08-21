import { run } from "elysiatech/errors"
import { createLogger, LogLevel } from "elysiatech/logger"
import * as esbuild from "esbuild"
import * as fs from "node:fs/promises"
import { watch } from "fs"
import { fork } from "node:child_process"

const LOG = createLogger("cli", {
	level: LogLevel.Success,
})

class Thread {

	/** @type NodeJS.ChildProcess */
	process

	run(command){
		if(this.process){
			try {
				this.process.kill()
				this.process.disconnect()
			} catch {}
		}
		this.process = fork(command, { stdio: "inherit" })
	}
}

const isDev = process.argv.includes("--dev");

/**
 * @type {import("esbuild").BuildOptions}
 */
const clientConfig = {
	entryPoints: [
		{
			in: "src/🏃client.js",
			out: "index"
		}
	],
	outdir: ".build/public",
	bundle: true,
	target: "ES2022",
	format: "esm",
	minify: true,
	conditions: ["worker", "browser"],
	treeShaking: true,
	entryNames: "[name]-[hash]",
	metafile: true,
	splitting: true,
	sourcemap: "linked",
}

/**
 * @type {import("esbuild").BuildOptions}
 */
const serverConfig = {
	entryPoints: [{
		in: "./src/🖥️server.js",
		out: "server"
	}],
	outdir: ".build",
	target: "ES2022",
	platform: "browser",
	format: "esm",
	treeShaking: true,
	bundle: true,
	external: ['node:*', 'url', 'path', 'sirv'],
	plugins: [
		{
			name: "inject-meta",
			setup(build){
				build.onEnd(async () => {
					const content = await fs.readFile(".build/metafile.json", "utf-8")
					const entry = await fs.readFile(".build/server.js", "utf-8")
					await fs.writeFile(".build/server.js", `globalThis.META = ${content};\n${entry}` )
				})
			}
		}
	],
}

async function dev(clientCtx, serverCtx){

	function debounce(cb, wait = 50) {
		let h = 0;
		let callable = (...args) => {
			clearTimeout(h);
			h = setTimeout(() => cb(...args), wait);
		};
		return callable;
	}

	let rebuild = false;

	const thread = new Thread()

	const build = async  () => {
		const t = performance.now()
		try{
			await compile(clientCtx, serverCtx)
			try{
				thread.run(".build/server.js")
				LOG.success(`${rebuild ? "rebuilt" : "built"} in ${(performance.now() - t).toFixed((2))}ms`)
			} catch(e) {
				LOG.error(e)
			}
		} catch(e){
			LOG.error(e)
		}
	}

	const watcher = watch(process.cwd(), {
		recursive: true,
	})

	const reload = debounce((_, p) => {
		if(p.startsWith(".build")) return
		rebuild = true
		LOG.debug(`${p} changed, rebuilding...`)
		build()
	}, 50)

	watcher.on("change", reload)

	return await build()
}

async function build(clientCtx, serverCtx){
	await compile(clientCtx, serverCtx)
	await clientCtx.dispose()
	await serverCtx.dispose()
}

async function compile(clientCtx, serverCtx){
	let t = performance.now()
	const client = await clientCtx.rebuild()

	const entry = Object.entries(client.metafile.outputs).find(([path, entry]) => entry.entryPoint === "src/🏃client.js")[0].replace(".build/public/", "")
	const css = Object.entries(client.metafile.outputs).find(([path, entry]) => entry.entryPoint === "src/🏃client.js")[1].cssBundle.replace(".build/public/", "")

	await fs.writeFile(".build/metafile.json", JSON.stringify({
		entry,
		css,
		...client.metafile
	}, null, 2))

	LOG.debug(`client built in ${(performance.now() - t).toFixed((2))}ms`)
	t = performance.now()
	await serverCtx.rebuild()
	LOG.debug(`server built in ${(performance.now() - t).toFixed((2))}ms`)
}

async function main(){

	await run(async () => {
		await fs.rm(".build", { recursive: true })
	})

	await run(async () => {
		await fs.mkdir(".build", { recursive: true })
		await fs.mkdir(".build/public", { recursive: true })
		await fs.mkdir(".build/posts", { recursive: true })
	})

	const clientCtx = await esbuild.context(clientConfig)
	const serverCtx = await esbuild.context(serverConfig)

	if(isDev){ await dev(clientCtx, serverCtx) }
	else { return build(clientCtx, serverCtx) }
}

main().catch(console.error);