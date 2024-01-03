import gsap from "gsap";
import { HTMLAttributes, PropsWithChildren, useLayoutEffect, useRef } from "react";

export function FadeIn(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>){
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(
		() =>
			void gsap.fromTo(
				ref.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.25, delay: .5, ease: "expo.in"}
			),
		[]
	);
  return <div ref={ref} {...props}>{props.children}</div>
}