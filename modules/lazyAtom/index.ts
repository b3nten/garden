import { atom, Getter } from "jotai";

export const lazyAtom = <T>(value: (get: Getter) => T) => {
  const internal = atom({ current: value });
  return atom(
    (get) => get(internal).current(get),
    (_, set, fn: () => T) =>
      set(internal, {
        current: fn,
      }),
  );
};
