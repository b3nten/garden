import { Router } from "@tanstack/react-router";
import root from "./screens/__root";
import homeRoute from "./screens/home";
import blogRoute from "./screens/blog";
import postRoute from "./screens/post";

const routeTree = root.addChildren([
	homeRoute,
	blogRoute,
	postRoute
]);

export const createRouter = () =>
	new Router({
		routeTree,
		context: {
			head: {
				title: "Benten"
			},
		},
	});

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
