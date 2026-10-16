"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => document.documentElement.hasAttribute("data-lite");
const getServerSnapshot = () => false;

/** True when Lite mode is on: no hero images, no autoplay. */
export function useLiteMode(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
