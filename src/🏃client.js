import "./🌍globals.js"
import "./🎨styles.css";
import {defineComponent, ElysiaComponent, html} from "./🎛️ui.js";

LOGGER.log("Welcome to my garden :)");

class AppEntry extends ElysiaComponent {

	static Tag = "app-entry";

	onMount(){
		this.data = JSON.parse(this.childNodes[0].textContent)
		LOGGER.debug("Data:", this.data)
	}

	render(){
		return html`
			<h1>Hello, ${this.data.name}</h1>
		`
	}
}

defineComponent(AppEntry);