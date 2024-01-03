import { Route } from "@tanstack/react-router";
import root from "./__root";

const route = new Route({
	getParentRoute: () => root,
	path: "/blog/post",
	component: UI,
	loader: () =>
		Promise.resolve({
			title: "Hello World",
			content: "Hello World!",
		}),
});

export default route;

export function UI() {
	return (
		<div className="max-w-700px mx-auto flex flex-col justify-center items-start mt-128px">
			<h1 className="text-[10vw] mx-auto">TITLE</h1>
		</div>
	);
}
