import React from "react";
import ReactDOM from "react-dom/client";
import World from "../world/index.tsx";
import { styles } from "../modules/css/index.ts";
import { createRouter } from "./router.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { createHead } from "unhead";
import { createRoutingSystem } from "../app/router.ts";
import { Provider } from "jotai";
import { App } from "../app/index.ts";

import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./styles/global.css"

createHead();
const router = createRouter();

createRoutingSystem(router);

ReactDOM.createRoot(document.getElementById("app")!).render(
	<React.StrictMode>
		<Provider store={App}>
			<style
				dangerouslySetInnerHTML={{
					__html: styles,
				}}
			/>
			<main className="relative z-10">
				<RouterProvider router={router} />
			</main>
			<World />
		</Provider>
	</React.StrictMode>
);
