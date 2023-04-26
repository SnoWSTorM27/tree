import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dagre from "dagre";
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
import Lesson2Node from "../lesson2Node";
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
  lesson: Lesson2Node,
  physics: PhysicsNode
};

const flowKey = "dinamic-flow";

const hide = (hidden) => (nodeOrEdge) => {
  for (const prop in hidden) {
    if (nodeOrEdge.parent === prop || nodeOrEdge.target === prop) {
      nodeOrEdge.hidden = hidden[prop];
      return nodeOrEdge;
    }
  }
  // if (nodeOrEdge.parent === nodeId) {
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
// let section = "";
// const filter = (items, count) => (nodeOrEdge) => {
//   nodeOrEdge.style = { opacity: "1" };
//   if (items.length === count) return nodeOrEdge;
//   for (const lesson of items) {
//     if (nodeOrEdge.id === lesson.id) return nodeOrEdge;
//     // if (nodeOrEdge.id === lesson.parent) return nodeOrEdge;
//     // if (nodeOrEdge.source === lesson.parent) {
//     //   section = nodeOrEdge.target;
//     //   console.log(section);
//     //   return nodeOrEdge;
//     // }
//     // if (nodeOrEdge.id === section) return nodeOrEdge;
//     // if (nodeOrEdge.source === section) return nodeOrEdge;
//     // if (nodeOrEdge?.data?.name === "Физика") return nodeOrEdge;
//   }
//   // if (nodeOrEdge.id === "13" || nodeOrEdge.source === "13") return nodeOrEdge;
//   // if (nodeOrEdge.id === "13" || nodeOrEdge.source === "13" || nodeOrEdge.id === "8" || nodeOrEdge.id === "2" || nodeOrEdge.source === "2" || nodeOrEdge.source === "8" || nodeOrEdge.id === "1") return nodeOrEdge;
//   if (items.length !== count) {
//     nodeOrEdge.style = { opacity: "0.1" };
//   }
//   return nodeOrEdge;
// };

const filter = (items, count) => (nodeOrEdge) => {
  nodeOrEdge.style = { opacity: "1" };
  if (items.length === count) return nodeOrEdge;
  for (const lesson of items) {
    if (nodeOrEdge.id === lesson.id) return nodeOrEdge;
    if (nodeOrEdge.id === lesson.parent) return nodeOrEdge;
    if (nodeOrEdge.source === lesson.id) return nodeOrEdge;
    if (nodeOrEdge.source === lesson.parent) {
      return nodeOrEdge;
    }
    if (nodeOrEdge.id === lesson.section) return nodeOrEdge;
    if (nodeOrEdge.source === lesson.section) return nodeOrEdge;
    if (nodeOrEdge?.data?.name === "Физика") return nodeOrEdge;
  }
  if (items.length !== count) {
    nodeOrEdge.style = { opacity: "0" };
  }
  return nodeOrEdge;
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = -15;

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  // const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    // node.targetPosition = isHorizontal ? 'left' : 'top';
    // node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: -nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };

    return node;
  });

  return { layoutedNodes: nodes, layoutedEdges: edges };
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const Flow = ({ sections, handleModal, selectedCategory, filteredLessons }) => {
  const dispatch = useDispatch();
  const initObj = {};
  const initialNodes = transformToNodes(sections);
  const edges1 = transformToEdges(sections, "1");
  const initialEdges = [...edges1];
  const nodesWithoutLessons = initialNodes.filter(node => node.type !== "lesson");
  const edgesWithoutLessons = initialEdges.filter(edge => edge.source.indexOf("lesson") === -1);
  const nodesWithLessons = initialNodes.filter(node => node.type === "lesson");
  const edgesWithLessons = initialEdges.filter(edge => edge.source.indexOf("lesson") !== -1);
  const countLessons = initialNodes.filter(node => node.type === "lesson").length;
  const subsections = initialNodes.filter(node => node.type === "subsection");
  subsections.forEach(sub => {
    initObj[sub.id] = true;
  });
  // const initialNodes = [...ini ...nodes1];
  const { layoutedNodes, layoutedEdges } = getLayoutedElements(
    nodesWithoutLessons,
    edgesWithoutLessons
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [hidden, setHidden] = useState(initObj);
  const [search, setSearch] = useState(false);
  // const [rfInstance, setRfInstance] = useState(null);
  const { setViewport, setCenter } = useReactFlow();
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
      const response = transformForResponse(sections, nodes);
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

  // useEffect(() => {
  //   setNodes((nds) => nds.map(hide(hidden)));
  //   setEdges((eds) => eds.map(hide(hidden)));
  // }, [hidden]);
  useEffect(() => {
    expandAndCollapseSubsections(hidden);
  }, [hidden]);
  useEffect(() => {
    setNodes((nds) => nds.map(filter(filteredLessons, countLessons)));
    setEdges((eds) => eds.map(filter(filteredLessons, countLessons)));
  }, [filteredLessons]);

  const totalNodes = [];
  const totalEdges = [];
  function expandAndCollapseSubsections() {
    // debugger;
    for (const prop in hidden) {
      const children = nodesWithLessons.filter(el => el.parent === prop);
      const childrenEdge = edgesWithLessons.filter(el => el.target === prop);
      if (!hidden[prop]) {
        children.forEach(el => totalNodes.push(el));
        childrenEdge.forEach(el => totalEdges.push(el));
      } else {
        totalNodes.filter(el => !children.includes(el));
        totalEdges.filter(el => !childrenEdge.includes(el));
      }
    }
    const { layoutedNodes: lnds, layoutedEdges: leds } = getLayoutedElements(
      [...nodesWithoutLessons, ...totalNodes],
      [...edgesWithoutLessons, ...totalEdges]
    );
    // console.log("layoutedNodes", lnds);
    // console.log("layoutedEdges", leds);
    setNodes(lnds);
    setEdges(leds);
  };

  // const handleClick = (e, node) => {
  //   if (node.type === "subsection") {
  //     setHidden((prevState) => ({
  //       ...prevState,
  //       [node.id]: !prevState[node.id]
  //     }));
  //   }
  //   if (node.type === "lesson") {
  //     handleModal(node);
  //   }
  //   console.log(node);
  //   // console.log(e);
  // };
  const handleClick = useCallback((e, node) => {
    const { x: zoomX, y: zoomY } = node.position;
    setCenter(zoomX + 600, zoomY + 100, { zoom: 0.8, duration: 1300 });
    // if (node.type === "subsection") {
    //   setHidden(prevState => !prevState);
    // }
    if (node.type === "subsection") {
      setHidden((prevState) => ({
        ...prevState,
        [node.id]: !prevState[node.id]
      }));
    }
    if (node.type === "lesson") {
      handleModal(node);
    }
    console.log(node);
    // console.log(e);
  }, [setCenter]);

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
        minZoom="0.1"
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
