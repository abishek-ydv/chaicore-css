import { startChaiCoreCSS } from "./chai-core-css.js";

let controller = null;

function boot() {
  if (controller || typeof document === "undefined") return controller;
  controller = startChaiCoreCSS(document, globalThis.ChaiCoreCSSConfig ?? {});
  return controller;
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
}

export function getChaiCoreCSSController() {
  return controller;
}

export { boot as start };
