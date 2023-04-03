export function transformToNodes(items) {
  const arrayNodes = [];
  for (const node of items) {
    arrayNodes.push({
      id: node.id,
      data: { name: node.name, video: node.video },
      type: node.type,
      position: node.position ? node.position : { x: 0, y: 500 }
    });
  }

  return arrayNodes;
}
