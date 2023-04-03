import React from "react";
import PropTypes from "prop-types";
import styles from "./breadcrumb.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSectionNameBySection } from "../../../store/sections";
import { getSubsectionNameBySubsection } from "../../../store/subsections";

function Breadcrumb({ section, subsection, lesson }) {
  const location = useLocation().pathname.slice(1);
  const { name } = useSelector(getSectionNameBySection(section));
  const nameSubsection = useSelector(getSubsectionNameBySubsection(subsection))?.name;
  const subsectionLocation = `${section}/${subsection}`;
  const lessonLocation = `${section}/${subsection}/${lesson}`;
  return (
    <nav aria-label="breadcrumb" className={styles["breadcrumb-nav"]} >
      <ol className="breadcrumb mx-2">
        <li className="breadcrumb-item"><Link to="/">Главная</Link></li>
        <li className={"breadcrumb-item" + (location === section ? " active" : "")}>
          {location === section ? (name) : (<Link to={`/${section}`}>{name}</Link>)}
        </li>
        {location === subsectionLocation &&
          <li className={"breadcrumb-item" + (location === subsection ? " active" : "")}>
            {location === subsectionLocation ? (nameSubsection) : (<Link to={`/${subsectionLocation}`}>{nameSubsection}</Link>)}
          </li>
        }
        {location === lessonLocation &&
          <li className="breadcrumb-item active">
            {nameSubsection}
          </li>
        }
      </ol>
    </nav>
  );
}
Breadcrumb.propTypes = {
  section: PropTypes.string,
  subsection: PropTypes.string,
  lesson: PropTypes.string
};

export default Breadcrumb;
