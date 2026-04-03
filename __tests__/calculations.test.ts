import { describe, expect, it } from "vitest";
import { alvaradoEngine } from "@/features/clinical-calculators/engines/engine";

describe("alvaradoEngine", () => {
  it("pontua 10 em quadro clássico completo", () => {
    const parsed = alvaradoEngine.parse({
      migratoryPain: "yes",
      anorexia: "yes",
      nauseaVomiting: "yes",
      rightLowerQuadrantPain: "yes",
      reboundTenderness: "yes",
      fever: "yes",
      leukocytosis: "yes",
      leftShift: "yes",
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(alvaradoEngine.compute(parsed.data).headline.value).toBe("10");
  });

  it("pontua 4 em quadro leve", () => {
    const parsed = alvaradoEngine.parse({
      migratoryPain: "yes",
      anorexia: "no",
      nauseaVomiting: "no",
      rightLowerQuadrantPain: "yes",
      reboundTenderness: "no",
      fever: "yes",
      leukocytosis: "no",
      leftShift: "no",
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(alvaradoEngine.compute(parsed.data).headline.value).toBe("4");
  });
});
