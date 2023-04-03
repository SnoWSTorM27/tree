
export const nodes = [
  {
    id: "root",
    type: "root",
    data: {
      name: "Физика"
    },
    position: { x: 250, y: 500 }
  },
  {
    id: "2",
    type: "custom",
    data: {
      name: "Механика"
    },
    position: { x: 200, y: 250 }
  },
  {
    id: "3",
    type: "custom",
    data: {
      name: "Теплота. Молекулярная физика"
    },
    position: { x: -50, y: 400 }
  },
  {
    id: "4",
    type: "custom",
    data: {
      name: "Электричество и магнетизм"
    },
    position: { x: 25, y: 320 }
  },
  {
    id: "5",
    type: "custom",
    data: {
      name: "Атомная и ядерная физика"
    },
    position: { x: 375, y: 290 }
  },
  {
    id: "6",
    type: "custom",
    data: {
      name: "Астрономия"
    },
    position: { x: 350, y: 200 }
  },
  {
    id: "7",
    type: "custom",
    data: {
      name: "Колебания и волны. Оптика"
    },
    position: { x: 420, y: 380 }
  },
  {
    id: "8",
    type: "custom",
    data: {
      name: "Статика"
    },
    position: { x: 20, y: 100 }
  },
  {
    id: "9",
    type: "custom",
    data: {
      name: "Кинематика"
    },
    position: { x: 210, y: 80 }
  },
  {
    id: "10",
    type: "custom",
    data: {
      name: "Динамика"
    },
    position: { x: 170, y: 130 }
  },
  {
    id: "11",
    type: "custom",
    data: {
      name: "Энергия"
    },
    position: { x: 40, y: 180 }
  },
  {
    id: "12",
    type: "leaf",
    data: {
      name: "1"
    },
    selected: true,
    style: { border: "1px solid green" },
    position: { x: 18, y: 70 },
    className: "completed"
  },
  {
    id: "13",
    type: "leaf",
    data: {
      name: "2"
    },
    style: { border: "1px solid green" },
    position: { x: 36, y: 70 },
    className: "completed"
  },
  {
    id: "14",
    type: "leaf",
    data: {
      name: "3"
    },
    style: { border: "1px solid green" },
    position: { x: 54, y: 70 },
    className: "completed"
  },
  {
    id: "15",
    type: "leaf",
    data: {
      name: "4"
    },
    style: { border: "1px solid green" },
    position: { x: 72, y: 70 }
  },
  {
    id: "16",
    type: "leaf",
    data: {
      name: "5"
    },
    style: { border: "1px solid green" },
    position: { x: 90, y: 70 }
  },
  {
    id: "17",
    type: "leaf",
    data: {
      name: "6"
    },
    style: { border: "1px solid green" },
    position: { x: 108, y: 70 },
    className: "completed"
  },
  {
    id: "18",
    type: "leaf",
    data: {
      name: "7"
    },
    style: { border: "1px solid green" },
    position: { x: 126, y: 70 }
  },
  {
    id: "19",
    type: "leaf",
    data: {
      name: "8"
    },
    style: { border: "1px solid green" },
    position: { x: 144, y: 70 },
    className: "completed"
  }
];

export const edges = [
  { id: "e1-2", source: "2", target: "root" },
  { id: "e1-3", source: "3", target: "root" },
  { id: "e1-4", source: "4", target: "root" },
  { id: "e1-5", source: "5", target: "root" },
  { id: "e1-6", source: "6", target: "root" },
  { id: "e1-7", source: "7", target: "root" },
  { id: "e2-8", source: "8", target: "2" },
  { id: "e2-9", source: "9", target: "2" },
  { id: "e2-10", source: "10", target: "2" },
  { id: "e2-11", source: "11", target: "2" }
  // { id: "e8-12", source: "12", target: "8" },
  // { id: "e8-13", source: "13", target: "8" },
  // { id: "e8-14", source: "14", target: "8" },
  // { id: "e8-15", source: "15", target: "8" },
  // { id: "e8-16", source: "16", target: "8" },
  // { id: "e8-17", source: "17", target: "8" },
  // { id: "e8-18", source: "18", target: "8" },
  // { id: "e8-19", source: "19", target: "8" }
];
