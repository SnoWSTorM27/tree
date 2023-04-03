import React from "react";
import PropTypes from "prop-types";
import styles from "./completedStatus.module.css";

function CompletedStatus({ completed }) {
  return (
    <>
      {completed ? (
        <div>
          <span className={styles["completed-lesson"]}>Пройдено</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className={"bi bi-check-circle-fill " + styles["completed-icon"]} viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
          </svg>
        </div>
      ) : (
        <div>
          <span className={styles["completed-lesson-false"]}>Не пройдено</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className={"bi bi-exclamation-octagon-fill " + styles["completed-icon-false"]} viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
          </svg>
        </div>
      )
      }
    </>
  );
}

CompletedStatus.propTypes = {
  completed: PropTypes.bool
};

export default CompletedStatus;
