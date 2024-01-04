import { atom, createStore } from "jotai";
import { godAtom } from "./godAtom";
import { loadable } from "jotai/utils";

export const App = createStore();

export const globals = atom({
  theme: "light",
});

const createPostAtom = (slug: string) =>
  godAtom(
    atom(() => new Promise<string>((r) => setTimeout(() => r(slug), 1000))),
  );

const a = createPostAtom("a")

const val = App.get(a)

