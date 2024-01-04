import { Route } from "@tanstack/react-router";
import Markdown from "react-markdown";
import root from "./__root";
import { PropsWithChildren } from "react";
import { FadeIn } from "../components/FadeIn";
import { css } from "../../modules/css";
import { darkTheme } from "../styles";

const post = await import("./post.md?raw").then((x) => x.default);
console.log(post);

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
		<FadeIn
			style={css({
				maxWidth: "848px",
				margin: "auto",
				flex: "1 1 auto",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "start",
				padding: "1rem",
			})}
		>
			<h1
				style={css({
					fontSize: "10vw",
					margin: "auto",
					marginBottom: "1rem",
					fontWeight: "bold",
					lineHeight: "1",
					color: darkTheme.palettes.primary[2],
				})}
			>
				TITLE
			</h1>
			<Markdown
				className="text-lg prose prose-xl text-[#EBEDE9]"
			>
				{post}
			</Markdown>
		</FadeIn>
	);
}
