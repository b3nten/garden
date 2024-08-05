import { Levels, createLogger } from "@benstack/logger";
import {
	BrowserDataCache,
	type DataCache,
	ServerDataCache,
} from "./💾datacache.ts";
import { LOGGER_NAME } from "./🔒constants.ts";
import "./🎨styles.css";

/****************************************************************************************
 * Application Entry
 *****************************************************************************************/

export function createApplication(args: { env: "browser" | "server" }) {
	const Log = createLogger({
		name: LOGGER_NAME,
		level: import.meta.env.DEV ? Levels.DEBUG : Levels.INFO,
	});
 
	if (args.env === "browser") {
		Log.shout("welcome to my garden :)");
	}

	const dataCache: DataCache =
		args.env === "browser" ? new BrowserDataCache() : new ServerDataCache();

	return { dataCache, Log };
}

/****************************************************************************************
 * Client Bootstrap
 *****************************************************************************************/

if (typeof document !== "undefined") {
	const app = createApplication({ env: "browser" });
	app.Log.debug("datacache", app.dataCache);
	import("./ui📐📐/🌏navigation.ts").then((mod) => {
		new mod.Navigation().append(document.body);
	})
}
