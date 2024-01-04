import { Route } from "@tanstack/react-router";
import root from "./__root";
import { useHead } from "unhead";
import { palegreen } from "../styles";

const route = new Route({
	getParentRoute: () => root,
	path: "/",
	component: UI,
	onEnter: () =>
		useHead({
			title: "Home",
		}),
});

export default route;

const PaletteDisplay = (props: { palette: string }) => (
	<div
		className="w-48 h-12 rounded-sm justify-start item-end"
		style={{ backgroundColor: props.palette }}
	>
		{props.palette}
	</div>
);

function Palettes(){
	return (
		<div className="flex flex-col space-y-2">
			{palegreen.map((p) => (
				<PaletteDisplay palette={p} />
			))}
		</div>
	)
}

export function UI() {
	return (
		<div>
			{/* <Palettes /> */}
		</div>
	);
}
