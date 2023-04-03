import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getLessonBySubsection, getLessonsBySubsection, getLessonsLoadingStatus } from "../../../store/lessons";
import { getSectionNameBySection } from "../../../store/sections";
import { getSubsectionBySection, getSubsectionNameBySubsection } from "../../../store/subsections";
import Breadcrumb from "../../common/breadcrumb";
import CompletedStatus from "../../common/completedStatus";
import Loader from "../../common/loader";
import ProgressBar from "../../common/progressBar";

function LessonsListPage() {
  const history = useHistory();
  const location = useLocation().pathname;
  const { section, subsection } = useParams();
  const lessons = useSelector(getLessonsBySubsection(subsection));
  const lessonsStatusLoading = useSelector(getLessonsLoadingStatus());
  const { name } = useSelector(getSubsectionNameBySubsection(subsection));
  return (
    <>
      <Breadcrumb section={section} subsection={subsection}/>
      <div className="d-flex flex-column m-3">
        <h1 className="text-center card-header">{name}</h1>
        {!lessonsStatusLoading ? (
          <ul className="card-body d-flex flex-column">
            {Object.values(lessons).map((lesson) => (
              <li key={lesson._id}
                className="card d-flex p-2 border border-dark flex-nowrap flex-row justify-content-between"
                role="button"
                onClick={() => history.push(`${location}/${lesson.lesson}`)}
              >
                <span className="card-text text-wrap d-flex align-items-center m-right-5">{lesson.name}</span>
                <div className="d-flex justify-content-center align-items-center ms-auto">
                  <CompletedStatus completed={lesson.completed}/>
                </div>
                {/* <iframe src={`https://www.youtube.com/embed/${lesson.video.codeVideo}`} frameBorder="0"></iframe> */}
              </li>
            ))}
          </ul>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default LessonsListPage;
