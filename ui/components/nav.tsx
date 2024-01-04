import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { css } from "../../modules/css";
import { animationContext } from "../../modules/animation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useScroll } from "@use-gesture/react";
import { Link } from "@tanstack/react-router";
import { flushSync } from "react-dom";
import { useClickAway } from "../../modules/hooks";
import { darkTheme } from "../styles";
gsap.registerPlugin(Flip);

const ctx = animationContext();

const enter = (s: gsap.TweenTarget) => () =>
	gsap.fromTo(
		s,
		{ opacity: 0, y: "-100%" },
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "ease-in-out",
		}
	);

const hide = (s: gsap.TweenTarget) => () =>
	gsap.to(s, {
		opacity: 0,
		duration: 0.5,
		y: "-100%",
		ease: "ease-in-out",
	});

const show = (s: gsap.TweenTarget) => () =>
	gsap.to(s, {
		opacity: 1,
		delay: 0.125,
		duration: 0.5,
		y: "0%",
		ease: "ease-in-out",
	});

export function Navigation() {
	const nav = useRef<HTMLElement>(null);
	const menu = useRef<HTMLDivElement>(null);
	const [showMenu, setShowMenu] = useState(false);
	const showNav = useRef(true);

	useLayoutEffect(() => void ctx.add(enter(nav.current!)), []);

	useScroll(
		(event) => {
			if (event.direction[1] > 0 && window.scrollY > 50 && showNav.current) {
				ctx.add(hide(nav.current!));
				showNav.current = false;
			} else if (event.direction[1] < 0 && !showNav.current) {
				ctx.add(show(nav.current!));
				showNav.current = true;
			}
		},
		{
			target: window,
			threshold: 10,
		}
	);

	const toggleMenu = useCallback(() => {
		const state = Flip.getState([nav.current!, menu.current!]);
		flushSync(() => setShowMenu(!showMenu));
		Flip.from(state, {
			ease: "ease-in-out",
		});
	}, [showMenu]);

	const linkHandler = useCallback(() => showMenu && toggleMenu(), [showMenu]);

	useClickAway(nav, () => {
		if (showMenu) toggleMenu();
	});

	return (
		<nav
			ref={nav}
			className="w-80vw md:w-60vw min-w-200px backdrop-blur-sm"
			style={css({
				padding: "1rem 1rem",
				backgroundColor: darkTheme.palettes.primary[4] + 32,
				border: "1px solid",
				borderColor: darkTheme.palettes.primary[5],
				position: "fixed",
				left: "50%",
				top: "3rem",
				transform: "translateX(-50%)",
				borderRadius: ".5rem",
				fontSize: "1.5rem",
				fontWeight: "bold",
				overflow: "hidden",
			})}
		>
			<div
				style={css({
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				})}
			>
				<div style={css({ color: darkTheme.palettes.primary_vibrant[3] })}>
					BƎNTƎN
				</div>
				<button
					style={css({
						fontSize: "1rem",
						color: darkTheme.palettes.primary_vibrant[3],
						padding: "1rem",
						transition: "all .25s ease-in-out",
						borderRadius: ".45rem",
						hover: {
							backgroundColor: darkTheme.palettes.primary[4] + 32,
							color: darkTheme.palettes.primary_vibrant[5],
						},
					})}
					onClick={toggleMenu}
				>
					MƎNU
				</button>
			</div>
			<div
				ref={menu}
				style={css({
					position: showMenu ? "unset" : "absolute",
					marginTop: "1rem",
					width: "100%",
					right: "0rem",
					left: "0rem",
					fontSize: "1rem",
					color: darkTheme.palettes.primary_vibrant[3],
					sm: {
						fontSize: "1.5rem",
					},
				})}
			>
				<ul className="flex justify-between">
					<li
						style={css({
							hover: {
								color: darkTheme.palettes.primary_vibrant[5],
								transition: "all .25s ease-in-out",
							},
						})}
					>
						<Link onClick={linkHandler} to="/">
							home
						</Link>
					</li>
					<li
						style={css({
							hover: {
								color: darkTheme.palettes.primary_vibrant[5],
								transition: "all .25s ease-in-out",
							},
						})}
					>
						<Link onClick={linkHandler} to="/blog">
							blog
						</Link>
					</li>
					<li
						style={css({
							hover: {
								color: darkTheme.palettes.primary_vibrant[5],
								transition: "all .25s ease-in-out",
							},
						})}
					>
						<Link onClick={linkHandler} to="/blog/post">
							projects
						</Link>
					</li>
					<li
						style={css({
							hover: {
								color: darkTheme.palettes.primary_vibrant[5],
								transition: "all .25s ease-in-out",
							},
						})}
					>
						<Link onClick={linkHandler} to="/blog">
							contact
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
