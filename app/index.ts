import { atom, createStore } from "jotai";
import rpc from "#vono/rpc";
import { godAtom } from "./godAtom";

export const App = createStore();

export const globals = atom({
	theme: "light",
});

const _blogPosts = atom(async () =>
	rpc.api.blog.$get().then((x) => x.json())
);

export const blogPosts = godAtom(_blogPosts, {
  key: "blog::posts::list",
});
