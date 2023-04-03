import React from "react";
import PropTypes from "prop-types";
import styles from "./progressBar.module.css";
import leaf from "../../../assets/leaf.svg";

function ProgressBar({ completedItems, totalItems }) {
  const progress = Math.ceil(completedItems / totalItems * 100);

  const stylesBar = {
    background: `conic-gradient(#e32012 ${progress * 3.6}deg, #ededed 0deg)`
  };

  return (
    <>
      <svg
        className="react-flow__node-leaf-img"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="mdi-leaf"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
      </svg>
      <img src={leaf} alt="leaf-lesson" className="react-flow__node-leaf-img" />
      <div className="d-flex justify-content-center align-items-center">
        <span className={styles["bar-text"]}>{completedItems}/{totalItems}</span>
      </div>
      <div className={styles["bar-container"]}>
        <div className={styles["bar-circular-progress"]} style={stylesBar}>
          <span className={styles["bar-progress-value"]}>{progress}%</span>
        </div>
      </div>
    </>
  );
}

ProgressBar.propTypes = {
  completedItems: PropTypes.number,
  totalItems: PropTypes.number
};

export default ProgressBar;
