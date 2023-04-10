export function transformForResponse(originArray, changedArray) {
  const arrayNodes = [];
  for (const node of originArray) {
    for (const changedNode of changedArray) {
      if (node.id === changedNode.id) {
        arrayNodes.push({
          ...node,
          position: changedNode.position
        });
      }
    }
  }

  return arrayNodes;
};
