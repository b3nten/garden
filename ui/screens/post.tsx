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
					color: "white"
				})}
			>
				TITLE
			</h1>
			<Markdown
				className="text-lg prose prose-xl prose-white"
				components={{
					// h1: H1,
					// h2: H2,
					// h3: H3,
					// h4: H4,
					// h5: H5,
					// ul: UnorderedList,
					// ol: OrderedList,
					// a: A,
				}}
			>
				{post}
			</Markdown>
		</FadeIn>
	);
}

export function H1() {
	return null;
}

const defaultHeaderStyles = css({
	color: darkTheme.palettes.secondary[3]
})

const defaultStyles = css({
	color: darkTheme.palettes.primary[2]
})

export function H2(props: PropsWithChildren) {
	return (
		<h2 style={defaultHeaderStyles} className="text-7xl font-thin mx-auto leading-none py-8">
			{props.children}
		</h2>
	);
}

export function H3(props: PropsWithChildren) {
	return (
		<h3 style={defaultHeaderStyles} className="text-5xl font-thin mx-auto leading-none py-8">
			{props.children}
		</h3>
	);
}

export function H4(props: PropsWithChildren) {
	return (
		<h4 style={defaultHeaderStyles} className="text-3xl mx-auto leading-none py-4">{props.children}</h4>
	);
}

export function H5(props: PropsWithChildren) {
	return (
		<h5 style={defaultHeaderStyles} className="text-2xl font-bold mx-auto leading-none py-4">
			{props.children}
		</h5>
	);
}

export function UnorderedList(props: PropsWithChildren) {
	return <ul style={defaultStyles} className="list-disc p-4">{props.children}</ul>;
}

export function OrderedList(props: PropsWithChildren) {
	return <ol style={defaultStyles} className="list-decimal p-4">{props.children}</ol>;
}

export function A(props: PropsWithChildren) {
	return <a style={defaultStyles} className="text-green-300 hover:underline" {...props} />;
}

export function P(props: PropsWithChildren) {
	return <p style={defaultStyles} className="text-lg py-4">{props.children}</p>;
}
