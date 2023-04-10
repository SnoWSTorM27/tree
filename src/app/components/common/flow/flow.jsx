import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow
} from "reactflow";

// import {
//   nodes as initialNodes,
//   edges as initialEdges
// } from "./initial-elements";

import LessonNode from "../lessonNode";
import SectionNode from "../sectionNode";
import SubsectionNode from "../subsectionNode";

import "reactflow/dist/style.css";
import "./flow.css";
import PhysicsNode from "../physicsNode";
import { transformToNodes } from "../../../utils/transformToNodes";
import { transformToEdges } from "../../../utils/transformToEdges";
import { transformForResponse } from "../../../utils/transformForResponse";
import { updateNodesList } from "../../../store/nodes";

const nodeTypes = {
  section: SectionNode,
  subsection: SubsectionNode,
  lesson: LessonNode,
  physics: PhysicsNode
};

const flowKey = "dinamic-flow";

const hide = (hidden) => (nodeOrEdge) => {
  // if (nodeOrEdge.target === "2" || nodeOrEdge.target === "8" || (Number(nodeOrEdge.id) > 7)) {
  //   nodeOrEdge.hidden = hidden;
  //   return nodeOrEdge;
  // }
  return nodeOrEdge;
};
const blur = (search) => (nodeOrEdge) => {
  if (nodeOrEdge.id === "13" || nodeOrEdge.source === "13") return nodeOrEdge;
  // if (nodeOrEdge.id === "13" || nodeOrEdge.source === "13" || nodeOrEdge.id === "8" || nodeOrEdge.id === "2" || nodeOrEdge.source === "2" || nodeOrEdge.source === "8" || nodeOrEdge.id === "1") return nodeOrEdge;
  if (search) {
    nodeOrEdge.style = { opacity: "0.3", borderColor: "#dbd514" };
  } else {
    nodeOrEdge.style = { opacity: "1" };
  }
  return nodeOrEdge;
};
let section = "";
const filter = (items, count) => (nodeOrEdge) => {
  nodeOrEdge.style = { opacity: "1" };
  if (items.length === count) return nodeOrEdge;
  for (const lesson of items) {
    if (nodeOrEdge.id === lesson.id) return nodeOrEdge;
    if (nodeOrEdge.id === lesson.parent) return nodeOrEdge;
    if (nodeOrEdge.source === lesson.parent) {
      section = nodeOrEdge.target;
      return nodeOrEdge;
    }
    if (nodeOrEdge.id === section) return nodeOrEdge;
    if (nodeOrEdge.source === section) return nodeOrEdge;
    if (nodeOrEdge.type === "physics") return nodeOrEdge;
  }
  // if (nodeOrEdge.id === "13" || nodeOrEdge.source === "13") return nodeOrEdge;
  // if (nodeOrEdge.id === "13" || nodeOrEdge.source === "13" || nodeOrEdge.id === "8" || nodeOrEdge.id === "2" || nodeOrEdge.source === "2" || nodeOrEdge.source === "8" || nodeOrEdge.id === "1") return nodeOrEdge;
  if (items.length !== count) {
    nodeOrEdge.style = { opacity: "0.3" };
  }
  return nodeOrEdge;
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const Flow = ({ sections, handleModal, selectedCategory, filteredLessons }) => {
  const dispatch = useDispatch();
  const initialNodes = transformToNodes(sections);
  const countLessons = initialNodes.filter(node => node.type === "lesson").length;
  const edges1 = transformToEdges(sections, "1");
  // const initialNodes = [...ini ...nodes1];
  const initialEdges = [...edges1];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hidden, setHidden] = useState(true);
  const [search, setSearch] = useState(false);
  // const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const rfInstance = useReactFlow();

  // console.log(initialNodes);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const nodes = flow.nodes;
      console.log(nodes);
      const response = transformForResponse(sections, nodes);
      console.log(response);
      dispatch(updateNodesList(response));
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      console.log(flow);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  useEffect(() => {
    setNodes((nds) => nds.map(hide(hidden)));
    setEdges((eds) => eds.map(hide(hidden)));
  }, [hidden]);
  useEffect(() => {
    setNodes((nds) => nds.map(blur(search)));
    setEdges((eds) => eds.map(blur(search)));
  }, [search]);
  // useEffect(() => {
  //   setNodes((nds) => nds.map(filter(filteredLessons, countLessons)));
  //   setEdges((eds) => eds.map(filter(filteredLessons, countLessons)));
  // }, [filteredLessons]);

  const handleClick = (e, node) => {
    // if (node.id === "2") {
    //   setHidden(prevState => !prevState);
    // }
    if (node.type === "lesson") {
      handleModal(node);
    }
    console.log(node);
    // console.log(e);
  };

  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        nodeTypes={nodeTypes}
        onNodeClick={(e, node) => handleClick(e, node)}
        fitView
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "lesson") return "#13f007";
            if (n.type === "section") return "#ad690a";
            if (n.type === "subsection") return "#ad690a";
            if (n.type === "physics") return "#000";

            return "#eee";
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return "#fff";
          }}
          nodeBorderRadius={2}
        />
        <Controls showInteractive={true} />
        <Background color="#aaa" gap={16} />
        {/* <div style={{ position: "absolute", left: 10, top: 10, zIndex: 4 }}>
          <div>
            <label htmlFor="search">
              isSearch
              <input
                id="search"
                type="checkbox"
                checked={search}
                onChange={(event) => setSearch(event.target.checked)}
                className="react-flow__issearch"
              />
            </label>
          </div>
        </div> */}
        <div className="save__controls">
          <button onClick={onSave}>save</button>
          <button onClick={onRestore}>restore</button>
        </div>
      </ReactFlow>
    </div>
  );
};

Flow.propTypes = {
  sections: PropTypes.array,
  filteredLessons: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedCategory: PropTypes.string,
  handleModal: PropTypes.func
};

// function Flow(props) {
//   return (<ReactFlowProvider>
//     <SaveRestore {...props}/>
//   </ReactFlowProvider>);
// };

export default Flow;
