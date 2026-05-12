export const CHAI_PREFIX = "chai-";
const TRANSFORM_TEMPLATE =
  "translate(var(--chai-translate-x, 0), var(--chai-translate-y, 0)) rotate(var(--chai-rotate, 0deg)) scale(var(--chai-scale, 1))";
const parseCache = new Map();
const MAX_CACHE_SIZE = 500;

export const DEFAULT_THEME = Object.freeze({
  colors: {
    transparent: "transparent",
    current: "currentColor",
    black: "#111827",
    white: "#ffffff",
    red: "#ef4444",
    orange: "#f97316",
    amber: "#f59e0b",
    yellow: "#eab308",
    green: "#22c55e",
    emerald: "#10b981",
    teal: "#14b8a6",
    cyan: "#06b6d4",
    blue: "#3b82f6",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    purple: "#a855f7",
    pink: "#ec4899",
    rose: "#f43f5e",
    gray: "#6b7280",
    slate: "#475569",
    zinc: "#71717a",
    neutral: "#737373",
    stone: "#78716c",
    ink: "#172033",
    cream: "#fff7ed",
    chai: "#9a5b22",
    "red-light": "#fecdd3",
    "red-dark": "#991b1b",
    "orange-light": "#fed7aa",
    "orange-dark": "#9a3412",
    "yellow-light": "#fef08a",
    "yellow-dark": "#854d0e",
    "green-light": "#bbf7d0",
    "green-dark": "#166534",
    "blue-light": "#bfdbfe",
    "blue-dark": "#1e3a8a",
    "purple-light": "#e9d5ff",
    "purple-dark": "#581c87",
    "pink-light": "#fbcfe8",
    "pink-dark": "#9d174d",
    "slate-light": "#cbd5e1",
    "slate-dark": "#334155",
    "subtle-dark": "#1f2937",
    porcelain: "#f8fafc",
    saffron: "#f59e0b",
    clove: "#2b1f18",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
  },
  fontFamilies: {
    sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    serif: "Georgia, Cambria, 'Times New Roman', Times, serif",
    mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, ui-monospace, monospace",
    display: "Fraunces, Georgia, Cambria, 'Times New Roman', Times, serif",
  },
  lineHeights: {
    none: "1",
    tight: "1.1",
    snug: "1.25",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  radii: {
    none: "0",
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    "3xl": "24px",
    "4xl": "32px",
    full: "9999px",
  },
  shadows: {
    xs: "0 1px 1px rgb(15 23 42 / 0.08)",
    sm: "0 1px 2px rgb(15 23 42 / 0.12)",
    md: "0 10px 24px rgb(15 23 42 / 0.14)",
    lg: "0 20px 44px rgb(15 23 42 / 0.18)",
    xl: "0 26px 64px rgb(15 23 42 / 0.22)",
    none: "none",
  },
  transitionProperties: {
    all: "all",
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform",
    none: "none",
  },
  easings: {
    linear: "linear",
    ease: "ease",
    in: "ease-in",
    out: "ease-out",
    "in-out": "ease-in-out",
  },
});

const spacingProperties = {
  p: ["padding"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  m: ["margin"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  mt: ["margin-top"],
  mr: ["margin-right"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
  gap: ["gap"],
};

const alignValues = {
  left: "left",
  center: "center",
  right: "right",
  justify: "justify",
  start: "start",
  end: "end",
};

const fontWeights = {
  thin: "100",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

const textDecorations = {
  underline: "underline",
  "line-through": "line-through",
  "no-underline": "none",
};

const displayUtilities = {
  block: { display: "block" },
  inline: { display: "inline" },
  "inline-block": { display: "inline-block" },
  flex: { display: "flex" },
  "inline-flex": { display: "inline-flex" },
  grid: { display: "grid" },
  hidden: { display: "none" },
};

const flexUtilities = {
  row: { "flex-direction": "row" },
  col: { "flex-direction": "column" },
  column: { "flex-direction": "column" },
  wrap: { "flex-wrap": "wrap" },
  nowrap: { "flex-wrap": "nowrap" },
  "1": { flex: "1 1 0%" },
  none: { flex: "none" },
};

const positionUtilities = {
  static: { position: "static" },
  fixed: { position: "fixed" },
  absolute: { position: "absolute" },
  relative: { position: "relative" },
  sticky: { position: "sticky" },
};

const alignmentValues = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyValues = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

const overflowValues = {
  hidden: "hidden",
  auto: "auto",
  scroll: "scroll",
  visible: "visible",
};

const objectFitValues = {
  contain: "contain",
  cover: "cover",
  fill: "fill",
  none: "none",
  "scale-down": "scale-down",
};

const aspectRatios = {
  square: "1 / 1",
  video: "16 / 9",
};

function createTheme(theme = {}) {
  return {
    colors: {
      ...DEFAULT_THEME.colors,
      ...(theme.colors ?? {}),
    },
    fontSizes: {
      ...DEFAULT_THEME.fontSizes,
      ...(theme.fontSizes ?? {}),
    },
    fontFamilies: {
      ...DEFAULT_THEME.fontFamilies,
      ...(theme.fontFamilies ?? {}),
    },
    lineHeights: {
      ...DEFAULT_THEME.lineHeights,
      ...(theme.lineHeights ?? {}),
    },
    radii: {
      ...DEFAULT_THEME.radii,
      ...(theme.radii ?? {}),
    },
    shadows: {
      ...DEFAULT_THEME.shadows,
      ...(theme.shadows ?? {}),
    },
    transitionProperties: {
      ...DEFAULT_THEME.transitionProperties,
      ...(theme.transitionProperties ?? {}),
    },
    easings: {
      ...DEFAULT_THEME.easings,
      ...(theme.easings ?? {}),
    },
  };
}

function unsupported(className, reason) {
  return {
    className,
    supported: false,
    styles: {},
    reason,
  };
}

function supported(className, category, styles) {
  return {
    className,
    supported: true,
    category,
    styles,
  };
}

function cloneResult(result) {
  return {
    ...result,
    styles: { ...result.styles },
  };
}

function canUseCache(options) {
  return !options.theme && !options.utilities;
}

function setCachedResult(className, result) {
  if (parseCache.size >= MAX_CACHE_SIZE) {
    parseCache.clear();
  }
  parseCache.set(className, cloneResult(result));
}

function applyUtilityFilter(parsed, options) {
  if (!parsed.supported || !Array.isArray(options.utilities)) return parsed;
  return options.utilities.includes(parsed.category)
    ? parsed
    : unsupported(parsed.className, "disabled-utility");
}

function isNumeric(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}

function toPixels(value) {
  if (!isNumeric(value)) return null;
  return `${Number(value)}px`;
}

function sizeValue(value, axis = "width") {
  if (value === "full") return "100%";
  if (value === "screen") return axis === "height" ? "100vh" : "100vw";
  if (value === "auto") return "auto";
  if (value === "fit") return "fit-content";
  if (value === "min") return "min-content";
  if (value === "max") return "max-content";
  return toPixels(value);
}

function resolveColor(parts, theme) {
  const key = parts.join("-");
  return theme.colors[key] ?? null;
}

function stylesFromProperties(properties, value) {
  return properties.reduce((styles, property) => {
    styles[property] = value;
    return styles;
  }, {});
}

function parseSpacing(className, parts) {
  const [utility, value] = parts;
  if (parts.length !== 2 || !spacingProperties[utility]) return null;

  const cssValue = value === "auto" ? "auto" : toPixels(value);
  if (!cssValue) return null;

  return supported(
    className,
    "spacing",
    stylesFromProperties(spacingProperties[utility], cssValue),
  );
}

function parseColorOrText(className, parts, theme) {
  if (parts[0] === "bg" && parts.length >= 2) {
    const color = resolveColor(parts.slice(1), theme);
    return color
      ? supported(className, "color", { "background-color": color })
      : null;
  }

  if (parts[0] !== "text" || parts.length < 2) return null;

  const textValue = parts.slice(1).join("-");
  if (alignValues[textValue]) {
    return supported(className, "typography", {
      "text-align": alignValues[textValue],
    });
  }

  if (theme.fontSizes[textValue]) {
    return supported(className, "typography", {
      "font-size": theme.fontSizes[textValue],
    });
  }

  if (isNumeric(textValue)) {
    return supported(className, "typography", {
      "font-size": `${Number(textValue)}px`,
    });
  }

  const color = resolveColor(parts.slice(1), theme);
  return color ? supported(className, "color", { color }) : null;
}

function parseTypography(className, parts, theme) {
  if (parts[0] === "font" && parts.length === 2 && fontWeights[parts[1]]) {
    return supported(className, "typography", {
      "font-weight": fontWeights[parts[1]],
    });
  }

  if (parts[0] === "font" && parts.length === 2 && theme.fontFamilies[parts[1]]) {
    return supported(className, "typography", {
      "font-family": theme.fontFamilies[parts[1]],
    });
  }

  if (parts[0] === "leading" && parts.length === 2) {
    const value = theme.lineHeights[parts[1]] ?? toPixels(parts[1]);
    return value
      ? supported(className, "typography", { "line-height": value })
      : null;
  }

  const textDecoration = textDecorations[parts.join("-")];
  if (textDecoration) {
    return supported(className, "typography", {
      "text-decoration": textDecoration,
    });
  }

  if (parts[0] === "italic" && parts.length === 1) {
    return supported(className, "typography", { "font-style": "italic" });
  }

  if (parts[0] === "not" && parts[1] === "italic" && parts.length === 2) {
    return supported(className, "typography", { "font-style": "normal" });
  }

  if (parts[0] === "uppercase" && parts.length === 1) {
    return supported(className, "typography", { "text-transform": "uppercase" });
  }

  if (parts[0] === "lowercase" && parts.length === 1) {
    return supported(className, "typography", { "text-transform": "lowercase" });
  }

  if (parts[0] === "capitalize" && parts.length === 1) {
    return supported(className, "typography", { "text-transform": "capitalize" });
  }

  return null;
}

function parseBorder(className, parts, theme) {
  if (parts[0] === "rounded") {
    if (parts.length === 1) {
      return supported(className, "border", { "border-radius": "9999px" });
    }

    const value = parts.slice(1).join("-");
    const radius = theme.radii[value] ?? toPixels(value);
    return radius
      ? supported(className, "border", { "border-radius": radius })
      : null;
  }

  if (parts[0] !== "border") return null;

  if (parts.length === 1) {
    return supported(className, "border", {
      "border-width": "1px",
      "border-style": "solid",
      "border-color": "currentColor",
    });
  }

  if (parts[1] === "w" && parts.length === 3) {
    const width = toPixels(parts[2]);
    return width
      ? supported(className, "border", {
        "border-width": width,
        "border-style": "solid",
      })
      : null;
  }

  const value = parts.slice(1).join("-");
  if (value === "none") {
    return supported(className, "border", { border: "none" });
  }

  if (["solid", "dashed", "dotted"].includes(value)) {
    return supported(className, "border", { "border-style": value });
  }

  const width = toPixels(value);
  if (width) {
    return supported(className, "border", {
      "border-width": width,
      "border-style": "solid",
    });
  }

  const color = resolveColor(parts.slice(1), theme);
  return color
    ? supported(className, "border", {
      "border-color": color,
      "border-style": "solid",
    })
    : null;
}

function parseLayout(className, parts) {
  const utility = parts.join("-");
  if (displayUtilities[utility]) {
    return supported(className, "layout", displayUtilities[utility]);
  }

  if (positionUtilities[utility]) {
    return supported(className, "layout", positionUtilities[utility]);
  }

  if (parts[0] === "flex" && parts.length === 2 && flexUtilities[parts[1]]) {
    return supported(className, "layout", flexUtilities[parts[1]]);
  }

  if (parts[0] === "grid" && parts[1] === "cols" && parts.length === 3) {
    const count = Number(parts[2]);
    if (Number.isInteger(count) && count > 0 && count <= 12) {
      return supported(className, "layout", {
        "grid-template-columns": `repeat(${count}, minmax(0, 1fr))`,
      });
    }
  }

  if (parts[0] === "items" && parts.length === 2 && alignmentValues[parts[1]]) {
    return supported(className, "layout", {
      "align-items": alignmentValues[parts[1]],
    });
  }

  if (parts[0] === "justify" && parts.length === 2 && justifyValues[parts[1]]) {
    return supported(className, "layout", {
      "justify-content": justifyValues[parts[1]],
    });
  }

  if (parts[0] === "content" && parts.length === 2 && justifyValues[parts[1]]) {
    return supported(className, "layout", {
      "align-content": justifyValues[parts[1]],
    });
  }

  if (parts[0] === "place" && parts.length === 2 && alignmentValues[parts[1]]) {
    return supported(className, "layout", {
      "place-items": alignmentValues[parts[1]],
    });
  }

  if (parts[0] === "self" && parts.length === 2 && alignmentValues[parts[1]]) {
    return supported(className, "layout", {
      "align-self": alignmentValues[parts[1]],
    });
  }

  if (parts[0] === "overflow" && parts.length === 2 && overflowValues[parts[1]]) {
    return supported(className, "layout", {
      overflow: overflowValues[parts[1]],
    });
  }

  return null;
}

function parseBoxModel(className, parts) {
  if (parts[0] === "box" && parts[1] === "border" && parts.length === 2) {
    return supported(className, "layout", { "box-sizing": "border-box" });
  }

  if (parts[0] === "box" && parts[1] === "content" && parts.length === 2) {
    return supported(className, "layout", { "box-sizing": "content-box" });
  }

  if (parts[0] === "scroll" && parts[1] === "smooth" && parts.length === 2) {
    return supported(className, "layout", { "scroll-behavior": "smooth" });
  }

  if (parts[0] === "cursor" && parts.length === 2) {
    return supported(className, "interaction", { cursor: parts[1] });
  }

  if (["top", "right", "bottom", "left"].includes(parts[0]) && parts.length === 2) {
    const value = parts[1] === "auto" ? "auto" : toPixels(parts[1]);
    return value
      ? supported(className, "layout", { [parts[0]]: value })
      : null;
  }

  if (parts[0] === "z" && parts.length === 2 && isNumeric(parts[1])) {
    return supported(className, "layout", { "z-index": String(Number(parts[1])) });
  }

  return null;
}

function parseSizing(className, parts) {
  if ((parts[0] === "w" || parts[0] === "h") && parts.length === 2) {
    const property = parts[0] === "w" ? "width" : "height";
    const value = sizeValue(parts[1], property === "height" ? "height" : "width");
    return value ? supported(className, "sizing", { [property]: value }) : null;
  }

  if (
    (parts[0] === "min" || parts[0] === "max") &&
    (parts[1] === "w" || parts[1] === "h") &&
    parts.length === 3
  ) {
    const property = `${parts[0]}-${parts[1] === "w" ? "width" : "height"}`;
    const value = sizeValue(parts[2], parts[1] === "h" ? "height" : "width");
    return value ? supported(className, "sizing", { [property]: value }) : null;
  }

  return null;
}

function parseMedia(className, parts) {
  if (parts[0] === "aspect" && parts.length === 2) {
    const value = aspectRatios[parts[1]] ?? null;
    return value ? supported(className, "media", { "aspect-ratio": value }) : null;
  }

  if (parts[0] === "object" && parts.length === 2 && objectFitValues[parts[1]]) {
    return supported(className, "media", {
      "object-fit": objectFitValues[parts[1]],
    });
  }

  return null;
}

function parseEffects(className, parts, theme) {
  if (parts[0] === "shadow") {
    const key = parts[1] ?? "md";
    return theme.shadows[key]
      ? supported(className, "effect", { "box-shadow": theme.shadows[key] })
      : null;
  }

  if (parts[0] === "opacity" && parts.length === 2) {
    const amount = Number(parts[1]);
    if (Number.isFinite(amount) && amount >= 0 && amount <= 100) {
      return supported(className, "effect", { opacity: String(amount / 100) });
    }
  }

  return null;
}

function parseTransition(className, parts, theme) {
  if (parts[0] === "transition") {
    const key = parts[1] ?? "all";
    const property = theme.transitionProperties[key] ?? null;
    return property
      ? supported(className, "transition", { "transition-property": property })
      : null;
  }

  if (parts[0] === "duration" && parts.length === 2) {
    const value = toPixels(parts[1]);
    return value
      ? supported(className, "transition", {
          "transition-duration": value.replace("px", "ms"),
        })
      : null;
  }

  if (parts[0] === "delay" && parts.length === 2) {
    const value = toPixels(parts[1]);
    return value
      ? supported(className, "transition", {
          "transition-delay": value.replace("px", "ms"),
        })
      : null;
  }

  if (parts[0] === "ease") {
    const key = parts.slice(1).join("-") || "ease";
    const easing = theme.easings[key] ?? null;
    return easing
      ? supported(className, "transition", {
          "transition-timing-function": easing,
        })
      : null;
  }

  return null;
}

function parseTransform(className, parts) {
  if (parts[0] === "transform" && parts[1] === "none" && parts.length === 2) {
    return supported(className, "transform", { transform: "none" });
  }

  if (parts[0] === "scale" && parts.length === 2 && isNumeric(parts[1])) {
    return supported(className, "transform", {
      "--chai-scale": String(Number(parts[1]) / 100),
      transform: TRANSFORM_TEMPLATE,
    });
  }

  if (parts[0] === "rotate" && parts.length === 2 && isNumeric(parts[1])) {
    return supported(className, "transform", {
      "--chai-rotate": `${Number(parts[1])}deg`,
      transform: TRANSFORM_TEMPLATE,
    });
  }

  if (parts[0] === "translate" && ["x", "y"].includes(parts[1]) && parts.length === 3) {
    const value = toPixels(parts[2]);
    return value
      ? supported(className, "transform", {
          [`--chai-translate-${parts[1]}`]: value,
          transform: TRANSFORM_TEMPLATE,
        })
      : null;
  }

  if (parts[0] === "origin" && parts.length >= 2) {
    return supported(className, "transform", {
      "transform-origin": parts.slice(1).join(" "),
    });
  }

  return null;
}

export function parseChaiClass(className, options = {}) {
  const token = String(className).trim();
  const useCache = canUseCache(options);
  if (useCache && parseCache.has(token)) {
    return cloneResult(parseCache.get(token));
  }

  if (!token.startsWith(CHAI_PREFIX)) {
    const result = unsupported(token, "not-a-chai-class");
    if (useCache) setCachedResult(token, result);
    return result;
  }

  const utility = token.slice(CHAI_PREFIX.length);
  if (!utility) {
    const result = unsupported(token, "empty-utility");
    if (useCache) setCachedResult(token, result);
    return result;
  }

  const parts = utility.split("-").filter(Boolean);
  const theme = createTheme(options.theme);
  const parsed =
    parseSpacing(token, parts) ??
    parseColorOrText(token, parts, theme) ??
    parseTypography(token, parts, theme) ??
    parseBorder(token, parts, theme) ??
    parseLayout(token, parts) ??
    parseBoxModel(token, parts) ??
    parseSizing(token, parts) ??
    parseMedia(token, parts) ??
    parseEffects(token, parts, theme) ??
    parseTransition(token, parts, theme) ??
    parseTransform(token, parts);

  const result = applyUtilityFilter(
    parsed ?? unsupported(token, "unsupported-utility"),
    options,
  );
  if (useCache) setCachedResult(token, result);
  return result;
}

export function getChaiClasses(element) {
  if (!element?.classList) return [];
  return Array.from(element.classList).filter((className) =>
    className.startsWith(CHAI_PREFIX),
  );
}

function collectChaiElements(root) {
  const elements = [];
  if (!root) return elements;

  if (root.nodeType === 1 && getChaiClasses(root).length > 0) {
    elements.push(root);
  }

  if (typeof root.querySelectorAll === "function") {
    root.querySelectorAll('[class*="chai-"]').forEach((element) => {
      if (getChaiClasses(element).length > 0) {
        elements.push(element);
      }
    });
  }

  return elements;
}

function rememberClasses(element, chaiClasses) {
  const existing = (element.dataset.chaiClasses ?? "")
    .split(/\s+/)
    .filter(Boolean);
  const next = Array.from(new Set([...existing, ...chaiClasses]));
  element.dataset.chaiClasses = next.join(" ");
}

function applyParsedStyles(element, styles) {
  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
}

export function applyChaiStyles(root = document, options = {}) {
  const elements = collectChaiElements(root);
  const report = {
    elements: 0,
    applied: [],
    ignored: [],
  };

  elements.forEach((element) => {
    const chaiClasses = getChaiClasses(element);
    if (chaiClasses.length === 0) return;

    report.elements += 1;
    if (options.recordClasses !== false) {
      rememberClasses(element, chaiClasses);
    }

    const appliedClasses = [];
    chaiClasses.forEach((className) => {
      const parsed = parseChaiClass(className, options);
      const entry = { element, ...parsed };

      if (parsed.supported) {
        applyParsedStyles(element, parsed.styles);
        appliedClasses.push(className);
        report.applied.push(entry);
      } else {
        report.ignored.push(entry);
      }
    });

    if (options.removeClasses !== false && appliedClasses.length > 0) {
      element.classList.remove(...appliedClasses);
    }
  });

  return report;
}

function observerTarget(root) {
  if (root?.nodeType === 9) {
    return root.body ?? root.documentElement;
  }

  return root;
}

export function startChaiCoreCSS(root = document, options = {}) {
  const config = {
    observe: true,
    ...options,
  };

  const initialReport = applyChaiStyles(root, config);
  const target = observerTarget(root);
  let observer = null;

  if (config.observe && target && typeof MutationObserver !== "undefined") {
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          applyChaiStyles(mutation.target, config);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 || typeof node.querySelectorAll === "function") {
            applyChaiStyles(node, config);
          }
        });
      });
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ["class"],
      childList: true,
      subtree: true,
    });
  }

  return {
    initialReport,
    observer,
    refresh() {
      return applyChaiStyles(root, config);
    },
    disconnect() {
      observer?.disconnect();
    },
  };
}

export function scan(root = document, options = {}) {
  return applyChaiStyles(root, options);
}

export function brew(root = document, options = {}) {
  return applyChaiStyles(root, options);
}

export function createChaiCoreCSS(options = {}) {
  return {
    parse(className) {
      return parseChaiClass(className, options);
    },
    apply(root = document) {
      return applyChaiStyles(root, options);
    },
    start(root = document) {
      return startChaiCoreCSS(root, options);
    },
  };
}
