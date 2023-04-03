import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/loader";
import {
  getSectionsDataStatus,
  getSectionsLoadingStatus,
  loadSectionsList
} from "../../../store/sections";
import { getNodesDataStatus, loadNodesList } from "../../../store/nodes";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const sectionsDataStatus = useSelector(getSectionsDataStatus());
  const nodesDataStatus = useSelector(getNodesDataStatus());
  const sectionsStatusLoading = useSelector(getSectionsLoadingStatus());

  useEffect(() => {
    // if (!sectionsDataStatus) dispatch(loadSectionsList());
    // if (!nodesDataStatus) dispatch(loadNodesList());
    // if (!lessonsDataStatus) dispatch(loadLessonsList());
  }, [sectionsDataStatus, nodesDataStatus]);
  if (sectionsStatusLoading) return <Loader />;

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
