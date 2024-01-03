import {
	Outlet,
	rootRouteWithContext,
	useRouter,
} from "@tanstack/react-router";
import { css } from "../../modules/css";
import { useEffect } from "react";
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
			<main className="relative -z-10">
				<Outlet  />
			</main>
			
		</div>
	);
}
