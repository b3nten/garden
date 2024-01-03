import { Route } from "@tanstack/react-router";
import root from "./__root";
import { useHead } from "unhead";

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

export function UI() {
	return <div className="h-200vh"></div>;
}