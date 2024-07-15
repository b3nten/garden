import { createLogger, Levels} from "@benstack/logger"
import { BrowserDataCache, ServerDataCache } from "./💾datacache.ts"
import { content, metadata } from "../posts/test.md"

import "./🎨styles.css"

export function createApplication(env: "server" | "browser"){

	const Log = createLogger({
		name: "BENTEN.GARDEN",
		level: import.meta.env.DEV ? Levels.DEBUG : Levels.INFO
	})

	if(env === "browser"){
		Log.shout("welcome to my garden :)")
	}

	const dataCache = env === "browser" ? new BrowserDataCache() : new ServerDataCache()

	return { dataCache, Log }
}

if(typeof document !== "undefined"){
	const app = createApplication("browser")
	app.Log.debug("datacache", app.dataCache.contents)
}