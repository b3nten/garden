import { buildTags } from "#vono/assets";
import { createApplication } from "./🏠entry";
import { ServerDataCache } from "./💾datacache";
import { AutoRouter } from "itty-router"

const shell = (args: { data: string, head: string } ) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	${args.head}
	<title>BENTEN.GARDEN</title>
</head>
<body>
	<script id="datacache" type="application/json">${args.data}</script>
</body>
</html>
`

export default async function server(req: Request): Promise<Response> {

	const app = createApplication("server")

	const dataCache = app.dataCache as ServerDataCache

	dataCache.set("globals", {
		site: {
			title: "BENTEN.GARDEN",
			description: "A garden of thoughts and ideas",
		}
	})

	const router = AutoRouter()

	router.get("*", async () => {

		app.Log.info("request", req.url)

		const head = await buildTags("src/🏠entry.ts")
		const data = dataCache.searialize()

		app.Log.debug("datacache", dataCache.searialize())
		app.Log.debug("head", head)

		return new Response(
			shell({ data, head }), 
			{ headers: { "content-type": "text/html" } }
		)
	})

	return router.fetch(req)
}