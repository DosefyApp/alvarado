import type { CalculatorManifest } from "@/features/clinical-calculators/types";

const yesNoOptions = [
  { label: "Selecione...", value: "" },
  { label: "Sim", value: "yes" },
  { label: "Não", value: "no" },
];

export const alvaradoManifest: CalculatorManifest = {
  slug: "alvarado",
  title: "Alvarado Score",
  shortTitle: "Alvarado",
  description: "Probabilidade clínica de apendicite aguda.",
  seoTitle: "Alvarado Score | Dosefy",
  seoDescription: "Calcule o escore de Alvarado com interpretação prática para suspeita de apendicite.",
  heroEyebrow: "Suspeita de apendicite",
  heroDescription:
    "Interface separada por sintomas, sinais e laboratório para transformar rapidamente a avaliação clínica em um score útil na triagem.",
  heroHighlights: [
    "Distribui o formulário em blocos clínicos intuitivos.",
    "Mostra faixa de probabilidade com leitura prática.",
    "Mantém alerta de que o score não substitui exame físico seriado e imagem.",
  ],
  resultMetricLabel: "Alvarado",
  actionLabel: "Calcular Alvarado",
  note: "Ferramenta de apoio à decisão. Não substitui julgamento clínico. O escore deve ser integrado a exame físico seriado e imagem quando indicada.",
  limitations: [
    "Apresentações atípicas podem reduzir a acurácia do escore.",
    "Não substitui ultrassom, tomografia ou avaliação cirúrgica quando houver piora clínica.",
    "Gestantes, idosos e imunossuprimidos podem exigir estratégia diagnóstica mais liberal.",
  ],
  references: [
    {
      label: "A practical score for the early diagnosis of acute appendicitis",
      href: "https://pubmed.ncbi.nlm.nih.gov/1863510/",
    },
    {
      label: "The Alvarado score for predicting acute appendicitis: a systematic review",
      href: "https://pubmed.ncbi.nlm.nih.gov/21811194/",
    },
  ],
  sections: [
    {
      id: "symptoms",
      title: "Sintomas",
      description: "Sintomas clássicos considerados no escore.",
    },
    {
      id: "signs",
      title: "Sinais",
      description: "Achados de exame físico ou sinais clínicos.",
    },
    {
      id: "labs",
      title: "Laboratório",
      description: "Critérios laboratoriais usados no escore.",
    },
  ],
  fields: [
    {
      name: "migratoryPain",
      label: "Dor migratória",
      type: "select",
      sectionId: "symptoms",
      options: yesNoOptions,
    },
    {
      name: "anorexia",
      label: "Anorexia",
      type: "select",
      sectionId: "symptoms",
      options: yesNoOptions,
    },
    {
      name: "nauseaVomiting",
      label: "Náusea ou vômito",
      type: "select",
      sectionId: "symptoms",
      options: yesNoOptions,
    },
    {
      name: "rightLowerQuadrantPain",
      label: "Dor em FID",
      type: "select",
      sectionId: "signs",
      options: yesNoOptions,
    },
    {
      name: "reboundTenderness",
      label: "Defesa / descompressão dolorosa",
      type: "select",
      sectionId: "signs",
      options: yesNoOptions,
    },
    {
      name: "fever",
      label: "Febre",
      type: "select",
      sectionId: "signs",
      options: yesNoOptions,
    },
    {
      name: "leukocytosis",
      label: "Leucocitose",
      type: "select",
      sectionId: "labs",
      options: yesNoOptions,
    },
    {
      name: "leftShift",
      label: "Desvio à esquerda",
      type: "select",
      sectionId: "labs",
      options: yesNoOptions,
    },
  ],
  initialValues: {
    migratoryPain: "",
    anorexia: "",
    nauseaVomiting: "",
    rightLowerQuadrantPain: "",
    reboundTenderness: "",
    fever: "",
    leukocytosis: "",
    leftShift: "",
  },
};

export const calculatorManifest = alvaradoManifest;
