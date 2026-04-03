import { z } from "zod";
import { buildEngine } from "@/features/clinical-calculators/engines/helpers";
import { formatInteger } from "@/features/clinical-calculators/utils";

const yesNoSchema = z.string().refine((value) => value === "yes" || value === "no", {
  message: "Selecione uma opção.",
});

const schema = z.object({
  migratoryPain: yesNoSchema,
  anorexia: yesNoSchema,
  nauseaVomiting: yesNoSchema,
  rightLowerQuadrantPain: yesNoSchema,
  reboundTenderness: yesNoSchema,
  fever: yesNoSchema,
  leukocytosis: yesNoSchema,
  leftShift: yesNoSchema,
});

export const alvaradoEngine = buildEngine(schema, (values) => {
  const components = [
    { label: "Dor migratória", points: values.migratoryPain === "yes" ? 1 : 0 },
    { label: "Anorexia", points: values.anorexia === "yes" ? 1 : 0 },
    { label: "Náusea ou vômito", points: values.nauseaVomiting === "yes" ? 1 : 0 },
    { label: "Dor em FID", points: values.rightLowerQuadrantPain === "yes" ? 2 : 0 },
    { label: "Defesa / descompressão dolorosa", points: values.reboundTenderness === "yes" ? 1 : 0 },
    { label: "Febre", points: values.fever === "yes" ? 1 : 0 },
    { label: "Leucocitose", points: values.leukocytosis === "yes" ? 2 : 0 },
    { label: "Desvio à esquerda", points: values.leftShift === "yes" ? 1 : 0 },
  ];

  const total = components.reduce((acc, item) => acc + item.points, 0);
  let tone: "success" | "warning" | "danger" = "success";
  let status = "Baixa probabilidade";
  let interpretation = "Score entre 0 e 4, compatível com menor probabilidade de apendicite aguda.";

  if (total >= 5 && total <= 6) {
    tone = "warning";
    status = "Probabilidade intermediária";
    interpretation = "Score entre 5 e 6, compatível com necessidade frequente de imagem e reavaliação seriada.";
  } else if (total >= 7) {
    tone = "danger";
    status = "Alta probabilidade";
    interpretation = "Score entre 7 e 10, compatível com maior probabilidade e necessidade de avaliação cirúrgica.";
  }

  return {
    headline: {
      label: "Alvarado Score",
      value: formatInteger(total),
      status,
      tone,
      description: "O escore varia de 0 a 10 e organiza sintomas, sinais e laboratório na suspeita de apendicite.",
    },
    interpretation: {
      title: "Interpretação clínica",
      tone,
      description: interpretation,
      bullets: [
        total <= 4
          ? "Baixa pontuação favorece observação e reavaliação clínica."
          : total <= 6
            ? "Faixa intermediária costuma favorecer imagem, observação e repetição do exame clínico."
            : "Alta pontuação favorece avaliação cirúrgica e integração com imagem quando apropriado.",
      ],
    },
    calculation: {
      title: "Como foi calculado",
      rows: components.map((item) => ({
        label: item.label,
        value: `${item.points} ponto(s)`,
      })),
      bullets: [`Pontuação total do Alvarado = ${total}.`],
    },
    extraPanels: [
      {
        title: "Leitura prática",
        tone,
        bullets: [
          "O escore ajuda na probabilidade, mas não substitui exame físico seriado, ultrassom ou tomografia quando indicados.",
          "A apresentação clínica pode ser atípica em idosos, gestantes e imunossuprimidos.",
        ],
      },
    ],
  };
});

export const calculatorEngine = alvaradoEngine;
