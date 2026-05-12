import type { ChaiController } from "./chai-core-css.js";

declare global {
  interface Window {
    ChaiCoreCSSConfig?: import("./chai-core-css.js").ChaiOptions;
  }
}

export function getChaiCoreCSSController(): ChaiController | null;
export function start(): ChaiController | null;
