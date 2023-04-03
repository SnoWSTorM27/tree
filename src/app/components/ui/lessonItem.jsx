import React from "react";
import PropTypes from "prop-types";

function LessonItem({ lesson }) {
  return (
    <div className="d-flex justify-content-center align-items-center lesson-item-search">
      <span className="card-text mb-2 mt-2 fst-italic text-nowrap text-decoration-underline ">
        {lesson.name}
      </span>
      {/* <button
        className="btn btn-lg btn-info  d-flex align-self-end m-2"
        // onClick={() => onToOrder(good)}
      >
        В корзину
      </button> */}
    </div>
  );
}

LessonItem.propTypes = {
  lesson: PropTypes.object
};

export default LessonItem;
