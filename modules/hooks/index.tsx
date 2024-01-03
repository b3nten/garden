import { useEffect, useLayoutEffect, useRef } from "react";

export function useOnce(callback: Function) {
	const hasRun = useRef(false);
	useEffect(() => {
		const run = !hasRun.current;
		if (run) {
			hasRun.current = true;
			return callback();
		}
	}, []);
}

export function useEventHandler<
	T extends EventTarget,
	K extends keyof HTMLElementEventMap
>(target: T, type: K, callback: (e: HTMLElementEventMap[K]) => void) {
	useLayoutEffect(() => {
		target.addEventListener(type, callback);
		return () => target.removeEventListener(type, callback);
	}, [target, type, callback]);
}

export function useClickAway(ref: any, cb: (e: MouseEvent | TouchEvent) => void) {
  const refCb = useRef(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    const handler = (e) => {
      const element = ref.current;
      if (element && !element.contains(e.target)) {
        refCb.current(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}