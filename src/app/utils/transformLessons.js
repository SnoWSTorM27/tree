export function transformLessons(nodes) {
  const arrayLessons = [];
  const lessons = nodes.filter(node => node.type === "lesson");
  for (const lesson of lessons) {
    const grandfather = nodes.find(item => item.id === lesson.parent)?.parent;
    arrayLessons.push({
      ...lesson,
      section: grandfather
    });
  }

  return arrayLessons;
}
