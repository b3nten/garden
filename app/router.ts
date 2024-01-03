import { type Router } from "@tanstack/react-router";
import { atom } from "jotai";
import { App } from "./index" 

export const route = atom<string | null>(null)

export function createRoutingSystem(router: Router){

  router.subscribe("onLoad", (e) => {
    App.set(route, e.toLocation.pathname)
  });

}