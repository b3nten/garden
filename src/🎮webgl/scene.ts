import * as ogl from "ogl";

export class PingPongBuffer {
	/**
	 * The render target used for reading the buffer.
	 */
	public read: ogl.RenderTarget;
	/**
	 * The render target used for writing to the buffer.
	 */
	public write: ogl.RenderTarget;
	/**
	 * The uniform that can be used to access the read texture in a shader.
	 */
	public uniform: { value: ogl.Texture };

	/**
	 * Creates a new ping pong buffer with the given dimensions.
	 * @param renderer The renderer to create the buffer with.
	 * @param width The width of the buffer.
	 * @param height The height of the buffer.
	 */
	constructor(
		public renderer: ogl.Renderer,
		public width: number,
		public height: number,
	) {
		this.read = new ogl.RenderTarget(renderer.gl, { width, height });
		this.write = new ogl.RenderTarget(renderer.gl, { width, height });
		this.uniform = { value: this.read.texture };
	}

	/**
	 * Swaps the read and write targets.
	 */
	swap() {
		const temp = this.read;
		this.read = this.write;
		this.write = temp;
		this.uniform.value = this.read.texture;
	}

	/**
	 * Resizes the buffer to the given dimensions.
	 * Warning: This will clear the buffer by creating new render targets.
	 * @param width The new width of the buffer.
	 * @param height The new height of the buffer
	 */
	resize(width: number, height: number) {
		this.read = new ogl.RenderTarget(this.renderer.gl, { width, height });
		this.write = new ogl.RenderTarget(this.renderer.gl, { width, height });
		this.uniform.value = this.read.texture;
	}
}

export class OGLFullScreenShader {
	public renderer: ogl.Renderer;
	public camera: ogl.Camera;
	public triangle: ogl.Triangle;
	public mesh: ogl.Mesh;
	public target?: ogl.RenderTarget;
	public canvas: HTMLCanvasElement;

	constructor(
		target: HTMLCanvasElement | ogl.RenderTarget,
		program: (renderer: ogl.Renderer) => ogl.Program,
	) {
		this.canvas =
			target instanceof HTMLCanvasElement
				? target
				: document.createElement("canvas");
		this.renderer = new ogl.Renderer({ dpr: 2, canvas: this.canvas });
		this.camera = new ogl.Camera(this.renderer.gl);
		this.triangle = new ogl.Triangle(this.renderer.gl);
		this.mesh = new ogl.Mesh(this.renderer.gl, {
			geometry: this.triangle,
			program: program(this.renderer),
		});
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.perspective({ aspect: window.innerWidth / window.innerHeight });
	}

	update() {
		this.renderer.render({
			scene: this.mesh,
			camera: this.camera,
			target: this.target,
		});
	}
}
