import { Route } from "@tanstack/react-router";
import root from "./__root";
import { useHead } from "unhead";
import { css } from "../../modules/css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FadeIn } from "../components/FadeIn";

const route = new Route({
	getParentRoute: () => root,
	path: "/blog",
	component: UI,
	loader: () =>
		Promise.resolve({
			posts: [
				{ slug: "hello-world", title: "Hello World", content: "Hello World!" },
			],
		}),
	onEnter: (route) =>
		useHead({
			title: "Blog",
		}),
});

export default route;

export function UI() {
	return (
		<FadeIn className="pt-256px p-4 grid md:grid-cols-2 gap-12">
			<Post />
			<Post />
			<Post />
			<Post />
		</FadeIn>
	);
}

function Post() {
	return (
		<div
			style={css({
				border: "1px solid rgba(148, 145, 148, .5)",
				borderRadius: "1.5rem",
				overflow: "hidden",
			})}
		>
			<div className="relative bg-neutral-900 aspect-3/2">
				<div className="absolute bottom-4 left-4 text-4xl">
					Name Of Post Here
				</div>
			</div>
		</div>
	);
}
