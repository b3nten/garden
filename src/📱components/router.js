import { ElysiaComponent, html } from "../🎛️ui";
import { nothing } from "lit"
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

const patchKey = Symbol.for("elysiarouter");

export class Router {

	static Events = {
		PopState: 'popstate',
		PushState: 'pushstate',
		ReplaceState: 'replacestate',
		HashChangeEvent: 'hashchange',
		LocationChange: 'locationchange'
	}

	static {

		if (typeof history !== "undefined" && typeof window[patchKey] === "undefined") {

			LOGGER.debug('patching history global')

			function patchGlobal(property, eventName){
				const original = history[property];
    			history[property] = function () {
      				const result = original.apply(this, arguments);

      				const event = new Event(eventName);
      				event.arguments = arguments;
      				window.dispatchEvent(event);

      				const changeEvent = new Event(Router.Events.LocationChange);
      				changeEvent.arguments = arguments;
      				window.dispatchEvent(changeEvent)

      				return result;
    			};
			}

			patchGlobal("pushState", Router.Events.PushState)

			patchGlobal("replaceState", Router.Events.ReplaceState)

			window.addEventListener("popstate", (e) => {
  				const event = new Event(Router.Events.LocationChange);
  				event.arguments = e;
      			window.dispatchEvent(event);
  			})

  			window.addEventListener("hashchange", (e) => {
  				const event = new Event(Router.Events.LocationChange);
  				event.arguments = e;
      			window.dispatchEvent(event);
  			})

  			Object.defineProperty(window, patchKey, { value: true });

  			LOGGER.debug('patched window globals')
  		}
	}

	static get pathname() { return location.pathname }

	static get search() { return location.search }

	static get hash() { return location.hash }

	static get state() { return history.state }

	static get params() {
		const params = new URLSearchParams(location.search)
		const obj = {}
		for (const [key, value] of params) {
			obj[key] = value
		}
		return obj
	}

	static set pathname(pathname) {
		this.navigate(pathname)
	}

	static set params(params) {
		const search = new URLSearchParams(params)
		this.navigate(`${location.pathname}?${search.toString()}`)
	}

	static navigate(pathname) {
		history.pushState({}, '', pathname)
	}

	static addEventListener(event, callback){
		window.addEventListener(event, callback)
		return () => window.deleteEventListner(event, callback)
	}

	static removeEventListener(event, callback){
		window.removeEventListener(event, callback)
	}
}

const stripLeadingSlash = (path) => path.replace(/^\//, "");
const stripTrailingSlash = (path) => path.replace(/\/$/, "");
const stripSlashes = (path) => stripLeadingSlash(stripTrailingSlash(path))

export class Route extends ElysiaComponent {

	static Tag = "rou-te"

	get path() { 
		const p = this.attributes.getNamedItem("path").value
		if(p === "/") return p;
		return stripSlashes(p)
	}

	get component(){
		return this.attributes.getNamedItem("element").value
	}

	onMount(){
		Router.addEventListener(Router.Events.LocationChange, this.#match)
		this.#match();
	}

	onUnmount(){
		Router.removeEventListener(Router.Events.LocationChange, this.#match)
	}

	render(){
		if(this.#active) return html`${unsafeHTML(`<${this.component}></${this.component}>`)}`

		return html`${nothing}`
	}

	getParent(node) {
    if (!node) {
        return null;
    }
    if (typeof node.assignedElements !== 'function' && node.assignedSlot?.parentNode) {
        // Element is slotted
        return node.assignedSlot;
    } else if (node.parentNode?.nodeType === 11) { // DOCUMENT_FRAGMENT
        // Element is in shadow root
        return node.parentNode.host;
    } else {
        return node.parentElement;
    }
	}

	#active = false;

	#match = () => {
		const base = []

		let parent = this.getParent(this)

		while(parent){
			if(parent.tagName === "ROU-TE"){
				base.unshift(stripSlashes(parent.path))
			}
			parent = this.getParent(parent)
		}

		const resolvedPath = [...base, ...stripSlashes(this.path).split("/")].filter(Boolean)

		const pathname = Router.pathname.split("/").filter(Boolean)

		if(!resolvedPath.length) resolvedPath.push("/")

		if(!pathname.length) pathname.push("/")

		if(resolvedPath.length > pathname.length) return this.#active = false;

		for(let i = 0; i < resolvedPath.length; i++){
			const componentPath = resolvedPath[i];
			const actualPath = pathname[i];

			if(componentPath === "*" || componentPath.startsWith(":")) continue;

			if(actualPath !== componentPath) return this.#active = false;
		}

		this.#active = true;
	}
}

export class UILink extends ElysiaComponent {

	static Tag = "ui-link"

	get href(){ return this.attributes.getNamedItem("href").value }

	render(){
		return html`<a href="${this.href}" @click=${this.#onClick}><slot></slot></a>`
	}

	getParent(node) {
    	if (!node) {
        	return null;
    	}
    	if (typeof node.assignedElements !== 'function' && node.assignedSlot?.parentNode) {
       		return node.assignedSlot;
   	 	} else if (node.parentNode?.nodeType === 11) {
        	return node.parentNode.host;
    	} else {
        	return node.parentElement;
    	}
	}

	#onClick = (e) => {

		e.preventDefault()

		if(["http://", "https://"].some(s => this.href.startsWith(s))){
			return;
		}

		if(this.href.startsWith("/")){
			Router.navigate(this.href)
			e.preventDefault()
			return;
		}

		const base = []

		let parent = this.getParent(this)

		while(parent){
			if(parent.tagName === "ROU-TE"){
				base.unshift(stripSlashes(parent.path))
			}
			parent = this.getParent(parent)
		}

		const resolvedPath = [...base, this.href].filter(Boolean)

		Router.navigate(`/${resolvedPath.join("/")}`)
	}

}

export function getParentParams(element){

	function getParent(node) {
    	if (!node) {
        	return null;
    	}
    	if (typeof node.assignedElements !== 'function' && node.assignedSlot?.parentNode) {
       		return node.assignedSlot;
   	 	} else if (node.parentNode?.nodeType === 11) {
        	return node.parentNode.host;
    	} else {
        	return node.parentElement;
    	}
	}

	const base = []

	let parent = getParent(element)

	while(parent){
		if(parent.tagName === "ROU-TE"){
			base.unshift(...stripSlashes(parent.path).split('/'))
		}
		parent = getParent(parent)
	}

	const pathname = Router.pathname.split("/").filter(Boolean)

	const result = {}

	for(let i = 0; i < Math.min(base.length, pathname.length); i++){
		let componentPath = base[i];
		let actualPath = pathname[i];

		if(componentPath.startsWith(":")){
			result[componentPath.replace(":", "")] = actualPath
		}
	}

	return result;
}

