import "./style.css";
import "./main.css";

import TotemHandler from "./TotemHandler";

const clips: TClip[] = [
  { name: "Galpão de espera", start: 0, end: 20 },
  { name: "Pendura", start: 20, end: 25 },
  { name: "Sangria", start: 26, end: 35 },
  { name: "Depenagem", start: 36, end: 52 },
  { name: "Evisceração", start: 60, end: 85 },
  { name: "Chiller de Resfriamento", start: 86, end: 95 },
  { name: "Embalagem Inicial", start: 95, end: 105 },
  { name: "Sala de Cortes", start: 106, end: 112 },
  { name: "Túnel de Congelamento", start: 115, end: 120 },
  { name: "Embalagem Final", start: 121, end: 125 },
  { name: "Expedição", start: 126, end: 200 },
];

// @ts-expect-error
const totemHandler = new TotemHandler(clips);
