import React from "react";
import PropTypes from "prop-types";
import LessonItem from "./lessonItem";

function LessonsList({ lessons, onZoom }) {
  return lessons.map((lesson) => (
    <LessonItem
      key={lesson.id}
      lesson={lesson}
      onZoom={onZoom}
    />
  ));
}
LessonsList.propTypes = {
  lessons: PropTypes.array,
  onZoom: PropTypes.func
};

export default LessonsList;
