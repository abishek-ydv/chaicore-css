import { describe, expect, it } from "vitest";
import {
  applyChaiStyles,
  brew,
  createChaiCoreCSS,
  parseChaiClass,
  startChaiCoreCSS,
} from "../lib/chai-core-css.js";

describe("parseChaiClass", () => {
  it("parses spacing utilities into pixel styles", () => {
    expect(parseChaiClass("chai-p-2")).toMatchObject({
      supported: true,
      category: "spacing",
      styles: { padding: "2px" },
    });

    expect(parseChaiClass("chai-px-8").styles).toEqual({
      "padding-left": "8px",
      "padding-right": "8px",
    });
  });

  it("parses colors, typography, borders, layout, and sizing", () => {
    expect(parseChaiClass("chai-bg-red").styles).toEqual({
      "background-color": "#ef4444",
    });
    expect(parseChaiClass("chai-text-center").styles).toEqual({
      "text-align": "center",
    });
    expect(parseChaiClass("chai-text-18").styles).toEqual({
      "font-size": "18px",
    });
    expect(parseChaiClass("chai-border-2").styles).toEqual({
      "border-width": "2px",
      "border-style": "solid",
    });
    expect(parseChaiClass("chai-rounded-xl").styles).toEqual({
      "border-radius": "12px",
    });
    expect(parseChaiClass("chai-flex").styles).toEqual({ display: "flex" });
    expect(parseChaiClass("chai-max-w-960").styles).toEqual({
      "max-width": "960px",
    });
  });

  it("parses package-grade typography and document helpers", () => {
    expect(parseChaiClass("chai-leading-relaxed").styles).toEqual({
      "line-height": "1.625",
    });
    expect(parseChaiClass("chai-font-mono").styles["font-family"]).toContain(
      "SFMono-Regular",
    );
    expect(parseChaiClass("chai-box-border").styles).toEqual({
      "box-sizing": "border-box",
    });
    expect(parseChaiClass("chai-scroll-smooth").styles).toEqual({
      "scroll-behavior": "smooth",
    });
  });

  it("parses transition, transform, and media utilities", () => {
    expect(parseChaiClass("chai-transition-colors").styles).toEqual({
      "transition-property":
        "color, background-color, border-color, text-decoration-color, fill, stroke",
    });
    expect(parseChaiClass("chai-duration-200").styles).toEqual({
      "transition-duration": "200ms",
    });
    expect(parseChaiClass("chai-ease-in-out").styles).toEqual({
      "transition-timing-function": "ease-in-out",
    });
    expect(parseChaiClass("chai-scale-105").styles).toMatchObject({
      "--chai-scale": "1.05",
    });
    expect(parseChaiClass("chai-aspect-video").styles).toEqual({
      "aspect-ratio": "16 / 9",
    });
    expect(parseChaiClass("chai-object-cover").styles).toEqual({
      "object-fit": "cover",
    });
  });

  it("supports cached parsing without exposing mutable cached styles", () => {
    const parsed = parseChaiClass("chai-p-6");
    parsed.styles.padding = "999px";

    expect(parseChaiClass("chai-p-6").styles.padding).toBe("6px");
  });

  it("can disable utility groups with options.utilities", () => {
    expect(
      parseChaiClass("chai-p-4", { utilities: ["color"] }),
    ).toMatchObject({
      supported: false,
      reason: "disabled-utility",
    });

    expect(
      parseChaiClass("chai-bg-red", { utilities: ["color"] }),
    ).toMatchObject({
      supported: true,
      category: "color",
    });
  });

  it("reports unsupported utilities without throwing", () => {
    expect(parseChaiClass("chai-space-wizard")).toMatchObject({
      supported: false,
      reason: "unsupported-utility",
    });
  });
});

describe("applyChaiStyles", () => {
  it("applies inline styles, removes applied classes, and stores original classes", () => {
    document.body.innerHTML = `
      <div id="card" class="card chai-p-8 chai-bg-blue chai-text-white"></div>
    `;

    const card = document.querySelector("#card");
    const report = applyChaiStyles(document);

    expect(report.applied).toHaveLength(3);
    expect(card.style.padding).toBe("8px");
    expect(card.style.backgroundColor).toBe("rgb(59, 130, 246)");
    expect(card.style.color).toBe("rgb(255, 255, 255)");
    expect(card.className).toBe("card");
    expect(card.dataset.chaiClasses).toBe(
      "chai-p-8 chai-bg-blue chai-text-white",
    );
  });

  it("leaves unsupported chai classes in place and records them as ignored", () => {
    document.body.innerHTML = `
      <div id="card" class="chai-p-4 chai-unknown-12"></div>
    `;

    const card = document.querySelector("#card");
    const report = applyChaiStyles(card);

    expect(report.applied).toHaveLength(1);
    expect(report.ignored).toHaveLength(1);
    expect(card.classList.contains("chai-p-4")).toBe(false);
    expect(card.classList.contains("chai-unknown-12")).toBe(true);
    expect(card.style.padding).toBe("4px");
  });

  it("lets later classes override earlier classes on the same property", () => {
    document.body.innerHTML = `
      <div id="card" class="chai-p-2 chai-p-8"></div>
    `;

    const card = document.querySelector("#card");
    applyChaiStyles(card);

    expect(card.style.padding).toBe("8px");
    expect(card.dataset.chaiClasses).toBe("chai-p-2 chai-p-8");
  });

  it("supports the brew alias and configured instances", () => {
    document.body.innerHTML = `
      <div id="card" class="chai-bg-brand chai-rounded-pill"></div>
    `;

    const engine = createChaiCoreCSS({
      theme: {
        colors: { brand: "#0f766e" },
        radii: { pill: "9999px" },
      },
    });

    const card = document.querySelector("#card");
    engine.apply(card);
    brew(card);

    expect(card.style.backgroundColor).toBe("rgb(15, 118, 110)");
    expect(card.style.borderRadius).toBe("9999px");
  });
});

describe("startChaiCoreCSS", () => {
  it("styles nodes added after startup with MutationObserver", async () => {
    document.body.innerHTML = `<main id="root"></main>`;
    const root = document.querySelector("#root");
    const controller = startChaiCoreCSS(root);

    const card = document.createElement("section");
    card.className = "chai-p-12 chai-rounded-8";
    root.append(card);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(card.style.padding).toBe("12px");
    expect(card.style.borderRadius).toBe("8px");
    expect(card.classList.contains("chai-p-12")).toBe(false);

    controller.disconnect();
  });
});
