import React, { memo } from "react";
import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import ProgressBar from "./progressBar";

function Lesson2Node({ data }) {
  return (
    <div className="px-1 py-1 d-flex flex-row justify-content-center align-items-center">
      <div className="d-flex mx-2">
        <div className="text fs-6">{data.name}</div>
      </div>
      {/* <div className="d-flex">
        <ProgressBar completedItems={5} totalItems={5} />
      </div> */}

      <Handle type="target" position={Position.Right} className="" />
      <Handle type="source" position={Position.Left} className="" />
    </div>
  );
}
Lesson2Node.propTypes = {
  data: PropTypes.object
};

export default memo(Lesson2Node);
