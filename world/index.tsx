import { Canvas } from "@react-three/fiber";
import { css } from "../modules/css";
import { Scene } from "./scene";
import { OrbitControls } from "@react-three/drei";

export default function Entry() {
	return (
		<div
			style={css({
				position: "fixed",
				inset: 0,
			})}
		>
			<Canvas>
				<OrbitControls />
				<Scene />
			</Canvas>
		</div>
	);
}
