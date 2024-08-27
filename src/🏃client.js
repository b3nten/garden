import "./🌍globals.js"
import "./🎨styles.css";
import { entries as components } from './📱components/*.js'
import { defineComponent } from "./🎛️ui.js";

LOGGER.debug("Components:", components)

for(const entry of components){
	const exports = Object.values(entry?.[1] ?? {})
	for(const e of exports){
		const err = run(() => e.Tag && void defineComponent(e))
		err && LOGGER.error(err)
	}
}

LOGGER.log("Welcome to my garden :)");