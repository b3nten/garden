import { Route } from "@tanstack/react-router";
import root from "./__root";
import { useHead } from "unhead";
import { css } from "../../modules/css";
import { Suspense, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FadeIn } from "../components/FadeIn";
import { darkTheme } from "../styles";
import { useAtom } from "jotai";
import { blogPosts } from "../../app";
import { loadable } from "jotai/utils";

const route = new Route({
	getParentRoute: () => root,
	path: "/blog",
	component: UI,
	wrapInSuspense: true,
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
	const [posts] = useAtom(blogPosts);
	return (
		<FadeIn className="p-4 grid md:grid-cols-2 gap-12">
			{posts.map((post) => (
				<Post key={post} slug={post}  />
			))}
		</FadeIn>
	);
}

function Post(props: { slug: string }) {
	return (
		<div
			style={css({
				border: "1px solid" + darkTheme.palettes.primary[6],
				borderRadius: "1.5rem",
				overflow: "hidden",
			})}
		>
			<div
				style={css({
					position: "relative",
					backgroundColor: darkTheme.palettes.primary[1],
					aspectRatio: "3/2",
				})}
			>
				<div className="absolute bottom-4 left-4 text-4xl">
					{props.slug}
				</div>
			</div>
		</div>
	);
}
