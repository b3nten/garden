import {
	Geometry,
	Mesh,
	Program,
	RenderTarget,
	Renderer,
	Vec2,
	Vec4,
} from "ogl";
import { primaryColor, timeFactor, webglLoaded } from "../globals.ts";
import { createDisposable, update } from "../toolkit.ts";
import frag from "./💣background.frag?raw";
import vert from "./🕸️background.vert?raw";
import { Flowmap } from "./flow.js";

export function createBackgroundEffect(target = document.body) {
	const { dispose, cleanup, disposableEvent } = createDisposable();

	const renderer = new Renderer({
		width: window.innerWidth,
		height: window.innerHeight,
		dpr: Math.min(window.devicePixelRatio, 2),
		antialias: true,
	});

	const flow = new Flowmap(renderer.gl, {
		falloff: 0.25,
		size: 512,
		dissipation: 0.9,
	});

	let lastTime;
	const mousePosition = new Vec2();
	const mouseVelocity = new Vec2();
	const lastMouse = new Vec2();

	disposableEvent(window, "mousemove", (e) => {
		mousePosition.set(
			e.x / renderer.gl.renderer.width,
			1 - e.y / renderer.gl.renderer.height,
		);

		if (!lastTime) {
			lastTime = performance.now();
			lastMouse.set(e.x, e.y);
		}

		const deltaX = e.x - lastMouse.x;
		const deltaY = e.y - lastMouse.y;

		lastMouse.set(e.x, e.y);

		const time = performance.now();

		const delta = Math.max(14, time - lastTime);
		lastTime = time;

		mouseVelocity.x = deltaX / delta;
		mouseVelocity.y = deltaY / delta;

		mouseVelocity.needsUpdate = true;
	});

	const geometry = new Geometry(renderer.gl, {
		position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
		uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
	});

	const program = new Program(renderer.gl, {
		vertex: vert,
		fragment: frag,
		uniforms: {
			u_time: { value: 0.0 },
			u_resolution: {
				value: new Vec2(renderer.gl.canvas.width, renderer.gl.canvas.height),
			},
			t_flow: flow.uniform,
			u_color: { value: new Vec4(0, 0, 0, 0) },
		},
	});

	const mesh = new Mesh(renderer.gl, { geometry, program });

	disposableEvent(window, "resize", () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		program.uniforms.u_resolution.value.x = renderer.gl.canvas.width;
		program.uniforms.u_resolution.value.y = renderer.gl.canvas.height;
	});

	cleanup(
		update((t) => {
			{
				program.uniforms.u_time.value += 0.01 * timeFactor.value;
				program.uniforms.u_resolution.value.x = renderer.gl.canvas.width;
				program.uniforms.u_resolution.value.y = renderer.gl.canvas.height;
				const c = primaryColor.value;
				program.uniforms.u_color.value.set(
					(c.r / 255) * 2 - 1.5,
					(c.g / 255) * 2 - 1.5,
					(c.b / 255) * 2 - 1.5,
					0,
				);
			}
			if (!mouseVelocity.needsUpdate) {
				mousePosition.set(-1);
				mouseVelocity.set(0);
			}
			mouseVelocity.needsUpdate = false;
			flow.aspect = renderer.gl.renderer.width / renderer.gl.renderer.height;
			flow.mouse.copy(mousePosition);
			flow.velocity.lerp(mouseVelocity, mouseVelocity.len() ? 0.5 : 0.1);
			flow.update();

			renderer.render({ scene: mesh });
			if (!webglLoaded.value) webglLoaded.value = true;
		}),
	);

	target.appendChild(renderer.gl.canvas);

	return dispose;
}
