import { atom,  } from "jotai";
import { Atom, ExtractAtomValue } from "jotai/vanilla";

declare global {
  var godAtoms: Record<string, unknown>;
}

const hasLocalStorage = typeof globalThis.localStorage !== "undefined";

export function godAtom<T extends Atom<any>>(
  asyncAtom: T,
  options: { key?: string; staleTime?: number} = {},
) {
  globalThis.godAtoms ??= {};

  const resultAtom = atom<any>(undefined);

  const localStorageAtom = atom(() => {
    if (options.key && hasLocalStorage) {
      const item = localStorage.getItem(options.key);
      if (item) {
        return JSON.parse(item) as ExtractAtomValue<T>;
      }
    }
    return undefined;
  }, (_, set, update: T) => {
    if (hasLocalStorage && options.key) {
      localStorage.setItem(options.key, JSON.stringify(update));
    }
    set(resultAtom, update);
  });

  const globalStorageAtom = atom(() => {
    if (options.key) {
      return globalThis.godAtoms[options.key] as ExtractAtomValue<T>
    }
    return undefined;
  });

  const controllerAtom = atom(async (get, { setSelf }) => {
    if (get(globalStorageAtom)) {
      get(asyncAtom).then((data) => setSelf(data));
      return get(globalStorageAtom);
    }
    if (get(localStorageAtom)) {
      get(asyncAtom).then((data) => setSelf(data));
      return get(localStorageAtom);
    }
    get(asyncAtom).then((data) => setSelf(data));
    return get(asyncAtom);
  }, (get, set, input?: T) => {
    if (input) {
      set(localStorageAtom, input);
    } else {
      get(asyncAtom).then((data) => set(localStorageAtom, data));
    }
  });

  return controllerAtom;
}

