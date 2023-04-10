import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/loader";
import { getNodesDataStatus, getNodesLoadingStatus, loadNodesList } from "../../../store/nodes";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const nodesDataStatus = useSelector(getNodesDataStatus());
  const nodesStatusLoading = useSelector(getNodesLoadingStatus());

  useEffect(() => {
    // if (!sectionsDataStatus) dispatch(loadSectionsList());
    if (!nodesDataStatus) dispatch(loadNodesList());
    // if (!lessonsDataStatus) dispatch(loadLessonsList());
  }, [nodesDataStatus]);
  if (nodesStatusLoading) return <Loader />;

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
