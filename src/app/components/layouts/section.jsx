import React from "react";
import { useParams } from "react-router-dom";
import LessonsListPage from "../page/lessonsListPage";
import SubsectionsListPage from "../page/subsectionsListPage";

function Section() {
  const { subsection } = useParams();

  return (
    <>
      {
        subsection ? (
          <LessonsListPage />
        ) : (
          <SubsectionsListPage />
        )
      }
    </>
  );
}

export default Section;
