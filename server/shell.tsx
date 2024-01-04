import { darkTheme } from "../ui/styles";
import { styles } from "../modules/css";
import manifest from "#vono/manifest"

const reactRefresh = `
import RefreshRuntime from '/@react-refresh'
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
`.trim();

const globalStyles = `\n
body {
	background-color: ${darkTheme.palettes.primary[9]}
}
`;

/** @jsxImportSource hono/jsx */
export default function Shell(props: { data?: Record<string, unknown> }) {
	const globals = Object.entries(props.data ?? {})
		.map(([k, v]) => `window.godAtoms.${k} = ${JSON.stringify(v)};`)
		.join("\n");
	return (
		<html>
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				{import.meta.env.DEV && (
					<>
						<script type="module" src="@vite/client" />
						<script
							type="module"
							dangerouslySetInnerHTML={{ __html: reactRefresh }}
						/>
					</>
				)}
				<script
					dangerouslySetInnerHTML={{ __html: `globalThis.godAtoms = {};` }}
				/>
				<script dangerouslySetInnerHTML={{ __html: globals }} />
				{manifest["ui/entry.tsx"].css?.map((css) => (
					<link rel="stylesheet" href={css} />
				))}
				<style>{globalStyles}</style>
				<style>{styles}</style>

				<title>benten's garden</title>
			</head>
			<body>
				<div id="app">
					<Spinner />
				</div>
				<script type="module" src={manifest["ui/entry.tsx"].file} />
			</body>
		</html>
	);
}

function Spinner() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<style>
				{`
				#loading {
					display: inline-block;
					width: 50px;
					height: 50px;
					border: 3px solid rgba(255,255,255,.3);
					border-radius: 50%;
					border-top-color: #fff;
					animation: spin 1s ease-in-out infinite;
					-webkit-animation: spin 1s ease-in-out infinite;
				}
				
				@keyframes spin {
					to { -webkit-transform: rotate(360deg); }
				}
				@-webkit-keyframes spin {
					to { -webkit-transform: rotate(360deg); }
				}		
				`}
			</style>
			<div id="loading"></div>
		</div>
	);
}
