import { Hole, render, signal, effect, computed, html, detach } from 'uhtml/preactive'

export abstract class Component {

	#disposes: (() => void)[] = []

	addDisposer(dispose: () => void){
		this.#disposes.push(dispose)
	}

	addEventListener(
		target: {
			addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void,
			removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
		}, 
		type: string, 
		listener: EventListenerOrEventListenerObject
	){
		target.addEventListener(type, listener)
		this.addDisposer(() => target.removeEventListener(type, listener))
	}

	target?: HTMLElement

	mount(target: HTMLElement){
		this.target = target
		render(target, () => this.render())
	}

	append(target: HTMLElement){
		this.target = target
		const element = document.createElement('component')
		target.append(element)
		this.mount(element)
	}

	before(target: HTMLElement){
		this.target = target
		const element = document.createElement('component')
		target.before(element)
		this.mount(element)
	}

	after(target: HTMLElement){
		this.target = target
		const element = document.createElement('component')
		target.after(element)
		this.mount(element)
	}

	destroy(){
		this.#disposes.forEach(dispose => dispose())
		if(this.target){
			detach(this.target)
			this.target.parentElement?.removeChild(this.target)
		}
	}

	abstract render(): Hole
}

export { signal, effect, computed, html }