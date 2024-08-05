import { Component, signal, html } from "./component";

export class Navigation extends Component {
	render(){
		return html`
			<nav class='text-white'>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/posts">Posts</a></li>
					<li><a href="/about">About</a></li>
				</ul>
			</nav>
		`
	}
}