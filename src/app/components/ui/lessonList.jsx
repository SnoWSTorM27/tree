import React from "react";
import PropTypes from "prop-types";
import LessonItem from "./lessonItem";

function LessonsList({ lessons }) {
  return lessons.map((lesson) => (
    <LessonItem
      key={lesson.id}
      lesson={lesson}
    />
  ));
}
LessonsList.propTypes = {
  lessons: PropTypes.array
};

export default LessonsList;
