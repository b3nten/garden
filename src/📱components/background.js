import { css, ElysiaComponent, html } from "../🎛️ui";
import { ElysiaElement } from "elysiatech/ui";
import { Game } from "elysiatech"

export class Background extends ElysiaComponent {

	static Tag = "webgl-background"

	static styles = css`
		:host {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: -1;
		}

		canvas {
			position: absolute;
			inset: 0px;
		}
	`

	onMount(){
		const canvas = this.renderRoot.getElementById('background')

		const game = new Game({
			
		})
	}

	render(){
		return html`<canvas id='background'></canvas>`
	}
}