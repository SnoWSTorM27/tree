export function transformToEdges(items, from) {
  const arrayEdges = [];
  for (const node of items) {
    if (!node.parent) continue;
    if (node.type === "lesson") continue;
    arrayEdges.push({
      id: `${node.parent}-${node.id}`,
      source: node.id,
      target: node.parent
    });
  }
  return arrayEdges;
}
