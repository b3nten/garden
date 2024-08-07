import { AutoRouter } from "itty-router";
import { buildTags } from "#vono/assets";
import { createApplication } from "./🏠entry";
import type { ServerDataCache } from "./💾datacache";
import { BASE_TITLE } from "./🔒constants";

/****************************************************************************************
 * Shell
 *****************************************************************************************/

const shell = (args: { data: string; head: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	${args.head}
	<title>${BASE_TITLE}</title>
</head>
<body>
	<script id="datacache" type="application/json">${args.data}</script>
</body>
</html>
`;

/****************************************************************************************
 * Server entry
 *****************************************************************************************/

export default async function server(req: Request): Promise<Response> {
	const app = createApplication({ env: "server" });

	const dataCache = app.dataCache as ServerDataCache;

	dataCache.set("globals", {
		site: {
			title: "BENTEN.GARDEN",
			description: "A garden of thoughts and ideas",
		},
	});

	const router = AutoRouter({
		catch: (err, ireq) => {
			app.Log.error("error", err);
		},
		missing: (ireq) => {
			app.Log.warn("missing", ireq.url);
		}
	});

	app.Log.info("request", req.url);

	router.get("/posts.aspx", async (ireq) => {

	})

	router.get("/posts/:post", async (ireq) => {
		
	})
	
	router.get("*", async (ireq) => {
		const head = await buildTags("src/🏠entry.ts");
		const data = dataCache.searialize();

		app.Log.debug("datacache", dataCache.searialize());
		app.Log.debug("head", head);

		return new Response(shell({ data, head }), {
			headers: { "content-type": "text/html" },
		});
	});

	return router.fetch(req);
}
