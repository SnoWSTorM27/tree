export function transformd3Data(items) {
  const arrayNodes = [];
  const subsections = [];

  for (const node of items) {
    if (node.type === "subsection") {
      const children = items.filter(item => item.parent === node.id).map(el => {
        return {
          name: el.name,
          attributes: { video: el.video }
        };
      });
      subsections.push({
        name: node.name,
        attributes: { parent: node.parent },
        children
      });
    }
  }
  for (const node of items) {
    const children = subsections.filter(s => s.attributes.parent === node.id);
    if (node.type === "section") {
      arrayNodes.push({
        name: node.name,
        children
      });
    }
  }
  const total = arrayNodes.filter(el => el.name !== "Физика");
  return { name: "Физика", children: [...total] };
}
