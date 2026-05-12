export type ChaiStyles = Record<string, string>;

export interface ChaiTheme {
  colors?: Record<string, string>;
  fontSizes?: Record<string, string>;
  fontFamilies?: Record<string, string>;
  lineHeights?: Record<string, string>;
  radii?: Record<string, string>;
  shadows?: Record<string, string>;
  transitionProperties?: Record<string, string>;
  easings?: Record<string, string>;
}

export interface ChaiOptions {
  theme?: ChaiTheme;
  observe?: boolean;
  recordClasses?: boolean;
  removeClasses?: boolean;
  utilities?: string[];
}

export interface ChaiParseResult {
  className: string;
  supported: boolean;
  category?: string;
  styles: ChaiStyles;
  reason?: string;
}

export interface ChaiApplyReport {
  elements: number;
  applied: ChaiParseResult[];
  ignored: ChaiParseResult[];
}

export interface ChaiController {
  initialReport: ChaiApplyReport;
  observer: MutationObserver | null;
  refresh(): ChaiApplyReport;
  disconnect(): void;
}

export const CHAI_PREFIX: "chai-";
export const DEFAULT_THEME: Readonly<Required<ChaiTheme>>;

export function parseChaiClass(
  className: string,
  options?: ChaiOptions,
): ChaiParseResult;

export function getChaiClasses(element: Element): string[];

export function applyChaiStyles(
  root?: ParentNode | Element | Document,
  options?: ChaiOptions,
): ChaiApplyReport;

export function startChaiCoreCSS(
  root?: ParentNode | Element | Document,
  options?: ChaiOptions,
): ChaiController;

export function scan(
  root?: ParentNode | Element | Document,
  options?: ChaiOptions,
): ChaiApplyReport;

export function brew(
  root?: ParentNode | Element | Document,
  options?: ChaiOptions,
): ChaiApplyReport;

export function createChaiCoreCSS(options?: ChaiOptions): {
  parse(className: string): ChaiParseResult;
  apply(root?: ParentNode | Element | Document): ChaiApplyReport;
  start(root?: ParentNode | Element | Document): ChaiController;
};
