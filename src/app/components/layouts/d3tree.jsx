import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
// import initData from "./initData.json";
import { useCenteredTree } from "../../utils/utils";
import { useSelector } from "react-redux";
import { getNodes, getNodesLoadingStatus } from "../../store/nodes";
import { transformd3Data } from "../../utils/transformd3Data";
// import "./styles.css";

const containerStyles = {
  width: "100vw",
  height: "100vh"
};
const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect width="20" height="20" y="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="-30" y="-25">
      {nodeDatum.name}
    </text>
    {/* {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )} */}
  </g>
);

function D3tree() {
  const nodes = useSelector(getNodes());
  const data = transformd3Data(nodes);
  // console.log("data", data);
  const [dimensions, translate, containerRef] = useCenteredTree();
  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={data}
        dimensions={dimensions}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="horizontal"
        nodeSize={{ x: 600, y: 200 }}
      />
    </div>
  );
}

export default D3tree;
