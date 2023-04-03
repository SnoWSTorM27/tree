import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSections, getSectionsLoadingStatus } from "../../store/sections";
import Loader from "../common/loader";
import ProgressBar from "../common/progressBar";

function Main() {
  const history = useHistory();
  const sections = useSelector(getSections());
  const sectionsStatusLoading = useSelector(getSectionsLoadingStatus());
  return (
    <>
      <div className="d-flex flex-column m-3">
        <h1 className="text-center card-header">Главная</h1>
        {!sectionsStatusLoading ? (
          <div className="card-body d-flex flex-column">
            {Object.values(sections).map((section) => (
              <div key={section._id}
                className="card d-flex mb-2 p-3 border border-dark flex-nowrap flex-row justify-content-between"
                role="button"
                onClick={() => history.push(`/${section.section}`)}
              >
                <h6 className="card-text text-wrap d-flex align-items-center m-right-5">{section.name}</h6>
                <div className="d-flex justify-content-center align-items-center ms-auto">
                  <ProgressBar
                    completedItems={section.completedItems}
                    totalItems={section.totalItems}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default Main;
