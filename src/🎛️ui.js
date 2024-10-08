
import { defineComponent, ElysiaElement, html, css, attribute } from "elysiatech/ui";

class ElysiaComponent extends ElysiaElement {
	createRenderRoot(){
		super.createRenderRoot()
		const root = this.shadowRoot;
		const links = document.head.getElementsByTagName('link');
		for (let i = 0; i < links.length; i++) {
			const link = links.item(i);
			if (!link || link.rel !== 'stylesheet') {
				continue;
			}
			root.appendChild(link.cloneNode(true));
		}
		return root;
	}
}

export {
	defineComponent,
	ElysiaComponent,
	html,
	css,
	attribute
}
