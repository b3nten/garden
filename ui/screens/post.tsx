import { Route } from "@tanstack/react-router";
import Markdown from "react-markdown";
import root from "./__root";
import { PropsWithChildren } from "react";
import { FadeIn } from "../components/FadeIn";

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
		<FadeIn className="max-w-700px mx-auto flex flex-col justify-center items-start mt-180px">
			<h1 className="text-[10vw] mx-auto leading-none">TITLE</h1>
			<Markdown
				className="text-lg"
				components={{
					h1: H1,
					h2: H2,
					h3: H3,
					h4: H4,
					h5: H5,
					ul: UnorderedList,
					ol: OrderedList,
					a: A,
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

export function H2(props: PropsWithChildren) {
	return (
		<h2 className="text-7xl font-thin mx-auto leading-none py-8">
			{props.children}
		</h2>
	);
}

export function H3(props: PropsWithChildren) {
	return (
		<h3 className="text-5xl font-thin mx-auto leading-none py-8">
			{props.children}
		</h3>
	);
}

export function H4(props: PropsWithChildren) {
	return (
		<h4 className="text-3xl mx-auto leading-none py-4">{props.children}</h4>
	);
}

export function H5(props: PropsWithChildren) {
	return (
		<h5 className="text-2xl font-bold mx-auto leading-none py-4">
			{props.children}
		</h5>
	);
}

export function UnorderedList(props: PropsWithChildren) {
	return <ul className="list-disc p-4">{props.children}</ul>;
}

export function OrderedList(props: PropsWithChildren) {
	return <ol className="list-decimal p-4">{props.children}</ol>;
}

export function A(props: PropsWithChildren) {
	return <a className="text-green-300 hover:underline" {...props} />;
}
