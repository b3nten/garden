import { atom, createStore } from "jotai";

export const App = createStore();

export const globals = atom({
  theme: "light",
});


