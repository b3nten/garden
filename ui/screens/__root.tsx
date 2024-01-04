import {
	Outlet,
	rootRouteWithContext,
} from "@tanstack/react-router";
import { css } from "../../modules/css";
import { Navigation } from "../components/nav";

const root = rootRouteWithContext<{ head: any }>()({
	component: Layout,
});

export default root;

function Layout() {
	return (
		<div
			style={css({
				minHeight: "100vh",
			})}
		>
			<Navigation />
			<main className="relative -z-10 pt-[172px]">
				<Outlet  />
			</main>
		</div>
	);
}
