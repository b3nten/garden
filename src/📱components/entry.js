import { css, ElysiaComponent, html } from "../🎛️ui";
import { getParentParams, Router } from "./router";

export class HomeView extends ElysiaComponent {
	static Tag = "home-view"
	render(){ 
		return html`
			<div>
				Home
			</div>` 
	}
}

export class PostListView extends ElysiaComponent {
	static Tag = "postlist-view"

	render(){ 
		return html`
			<div>
				Posts
			</div>
		`
	}
}

export class PostView extends ElysiaComponent {
	static Tag = "post-view"
	onMount(){
		console.log(getParentParams(this))
	}
	render(){ 
		return html`
			<div>
				Post
			</div>
		` 
	}
}

export class AppEntry extends ElysiaComponent {

	static Tag = "app-entry";

	static styles = css`
		:host {
			position: relative;
		}
	`

	onMount(){
		this.data = JSON.parse(this.childNodes[0].textContent)
		LOGGER.debug("Data:", this.data)
	}

	render(){
		return html`
			<ui-header></ui-header>
			<ui-link href="/">home</ui-link>
			<ui-link href="/posts">posts</ui-link>
			<ui-link href="/p/foobar">post</ui-link>
			<rou-te path="/" element="home-view"></rou-te>
			<rou-te path="/posts" element="postlist-view"></rou-te>
			<rou-te path="/p/:post" element="post-view"></rou-te>
			<webgl-background></webgl-background>
			<ui-footer></ui-footer>
		`
	}
}
