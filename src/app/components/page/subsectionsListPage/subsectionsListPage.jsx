import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getSectionNameBySection } from "../../../store/sections";
import { getSubsectionBySection, getSubsectionsLoadingStatus } from "../../../store/subsections";
import Breadcrumb from "../../common/breadcrumb";
import Loader from "../../common/loader";
import ProgressBar from "../../common/progressBar";

function SubsectionsListPage() {
  const history = useHistory();
  const location = useLocation().pathname;
  const { section } = useParams();
  const subsections = useSelector(getSubsectionBySection(section));
  const subsectionsStatusLoading = useSelector(getSubsectionsLoadingStatus());
  const { name } = useSelector(getSectionNameBySection(section));
  return (
    <>
      <Breadcrumb section={section}/>
      <div className="d-flex flex-column m-3">
        <h1 className="text-center card-header">{name}</h1>
        {!subsectionsStatusLoading ? (
          <ul className="card-body d-flex flex-column">
            {Object.values(subsections).map((subsection) => (
              <li key={subsection._id}
                className="card d-flex mb-2 p-3 border border-dark flex-nowrap flex-row justify-content-between"
                role="button"
                onClick={() => history.push(`${location}/${subsection.subsection}`)}
              >
                <h6 className="card-text text-wrap d-flex align-items-center m-right-5">{subsection.name}</h6>
                <div className="d-flex justify-content-center align-items-center ms-auto">
                  <ProgressBar
                    completedItems={subsection.completedItems}
                    totalItems={subsection.totalItems}
                  />
                </div>
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

export default SubsectionsListPage;
