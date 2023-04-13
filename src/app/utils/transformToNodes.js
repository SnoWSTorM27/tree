// export function transformToNodes(items) {
//   const arrayNodes = [];
//   for (const node of items) {
//     arrayNodes.push({
//       id: node.id,
//       data: { name: node.name, video: node.video },
//       type: node.type,
//       position: node.position ? node.position : { x: 0, y: 500 }
//     });
//   }

//   return arrayNodes;
// }

export function transformToNodes(items) {
  const heightNode = 34;
  const diffHeightNode = 10;
  const arrayNodes = [];
  for (const node of items) {
    const parentX = items.find(item => item.id === node.parent)?.position.x;
    const parentY = items.find(item => item.id === node.parent)?.position.y;
    const children = items.filter(item => item.parent === node.id);
    const countChildren = children.length;

    // children.forEach((child, index) => {
    //   arrayNodes.push({
    //     id: child.id,
    //     data: { name: child.name, video: child.video },
    //     type: child.type,
    //     position: { x: parentX + 400 * defineDepth(child.type), y: (parentY - (heightNode + diffHeightNode) * countChildren / 2) + index * (heightNode + diffHeightNode) }
    //   });
    // });
    arrayNodes.push({
      id: node.id,
      data: { name: node.name, video: node.video },
      type: node.type,
      parent: node.parent,
      position: node.name === "Физика" ? node.position : { x: node.position.x, y: node.position.y }
    });
  }

  return arrayNodes;
}

function defineDepth(type) {
  switch (type) {
  case "section":
    return 1;
  case "subsection":
    return 2;
  case "lesson":
    return 3;
  default:
    return 0;
  }
}
