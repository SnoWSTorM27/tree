import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dagre from "dagre";
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

const nodeTypes = {
  section: SectionNode,
  subsection: SubsectionNode,
  lesson: Lesson2Node,
  physics: PhysicsNode
};

const flowKey = "dinamic-flow1";
const hide = (hidden) => (nodeOrEdge) => {
  // console.log("Hidden", hidden);
  for (const prop in hidden) {
    // console.log(prop, nodeOrEdge);
    // if (!hidden[prop]) continue;
    if (nodeOrEdge.parent === prop || nodeOrEdge.target === prop) {
      nodeOrEdge.hidden = hidden[prop];
      return nodeOrEdge;
    }
  }
  // if (nodeOrEdge.target === "2" || nodeOrEdge.target === "8" || (Number(nodeOrEdge.id) > 7)) {
  //   nodeOrEdge.hidden = hidden;
  //   return nodeOrEdge;
  // }
  return nodeOrEdge;
};
// const calculateCountChildren = (items) => {

// }
const filter = (items, count) => (nodeOrEdge) => {
  nodeOrEdge.style = { opacity: "1" };
  if (items.length === count) return nodeOrEdge;
  for (const lesson of items) {
    if (nodeOrEdge.id === lesson.id) {
      return nodeOrEdge;
    };
    if (nodeOrEdge.id === lesson.parent) {
      const countSearchChildren = items.filter(l => l.parent === lesson.parent).length;
      nodeOrEdge.data.countSearchChildren = countSearchChildren;
      return nodeOrEdge;
    };
    if (nodeOrEdge.source === lesson.id) return nodeOrEdge;
    if (nodeOrEdge.source === lesson.parent) {
      return nodeOrEdge;
    }
    if (nodeOrEdge.id === lesson.section) return nodeOrEdge;
    if (nodeOrEdge.source === lesson.section) return nodeOrEdge;
    if (nodeOrEdge?.data?.name === "Физика") return nodeOrEdge;
  }
  if (items.length !== count) {
    nodeOrEdge.style = { opacity: "0.05" };
  }
  return nodeOrEdge;
};

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 300;
  const nodeHeight = -15;
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
      y: nodeWithPosition.y + nodeHeight / 2
    };

    return node;
  });

  return { layoutedNodes: nodes, layoutedEdges: edges };
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const Flow = ({ sections, handleModal, selectedCategory, filteredLessons, zoomLesson, isFilter, isSearch }) => {
  const initialNodes = transformToNodes(sections);
  const initObj = {};
  const countLessons = initialNodes.filter(node => node.type === "lesson").length;
  const edges1 = transformToEdges(sections, "1");
  // const initialNodes = [...ini ...nodes1];
  const initialEdges = [...edges1];
  const nodesWithoutLessons = initialNodes.filter(node => node.type !== "lesson");
  const edgesWithoutLessons = initialEdges.filter(edge => edge.source.indexOf("lesson") === -1);
  const nodesWithLessons = initialNodes.filter(node => node.type === "lesson");
  const edgesWithLessons = initialEdges.filter(edge => edge.source.indexOf("lesson") !== -1);
  const subsections = initialNodes.filter(node => node.type === "subsection");
  subsections.forEach(sub => {
    initObj[sub.id] = true;
  });
  const { layoutedNodes, layoutedEdges } = getLayoutedElements(
    nodesWithoutLessons,
    edgesWithoutLessons
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [hidden, setHidden] = useState(initObj);
  const [zoom, setZoom] = useState("Section_2");
  const [zoomLsn, setZoomLsn] = useState("");
  // const [rfInstance, setRfInstance] = useState(null);
  const { setViewport, setCenter } = useReactFlow();
  const rfInstance = useReactFlow();

  // console.log(initialNodes);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "floating" }, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
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

  const handleMoveZoomCenterNode = useCallback((nodes, zoom) => {
    if (!zoom) return;
    const newPositionsNode = nodes.find(n => n.id === zoom)?.position;
    const { x: zoomX, y: zoomY } = newPositionsNode;
    setCenter(zoomX + 700, zoomY + 50, { zoom: 0.8, duration: 800 });
  }, [zoom]);

  useEffect(() => {
    // console.log(zoomLesson);
    if (!isFilter && !isSearch && zoomLesson) {
      setHidden((prevState) => ({
        ...prevState,
        [zoomLesson?.parent]: false
      }));
      setTimeout(() => {
        setZoom(zoomLesson.id);
      }, 0);
    } else if (zoomLesson) {
      setTimeout(() => {
        setZoom(zoomLesson.id);
      }, 0);
    }
  }, [zoomLesson, isFilter, isSearch]);

  // useEffect(() => {
  //   if (!zoomLsn) return;
  //   // setTimeout(() => {
  //   handleMoveZoomCenterNode(nodes, zoomLsn);
  //   // }, 0);
  // }, [nodes, zoomLsn]);
  useEffect(() => {
    handleMoveZoomCenterNode(nodes, zoom);
  }, [nodes, zoom]);
  useEffect(() => {
    expandAndCollapseSubsections(hidden);
  }, [hidden]);
  useEffect(() => {
    if (isFilter || isSearch) {
      const mapOpened = filteredLessons.map(el => el.parent);
      const unique = mapOpened.filter((e, i) => mapOpened.indexOf(e) === i);
      unique.forEach(el => {
        if (hidden[el]) {
          setHidden((prevState) => ({
            ...prevState,
            [el]: false
          }));
        }
      });
    }
  }, [isFilter, isSearch, filteredLessons]);
  // useEffect(() => {
  //   setNodes((nds) => nds.map(hide(hidden)));
  //   setEdges((eds) => eds.map(hide(hidden)));
  // }, [hidden]);
  // useEffect(() => {
  //   setNodes((nds) => nds.map(blur(search)));
  //   setEdges((eds) => eds.map(blur(search)));
  // }, [search]);
  useEffect(() => {
    setNodes((nds) => nds.map(filter(filteredLessons, countLessons)));
    setEdges((eds) => eds.map(filter(filteredLessons, countLessons)));
  }, [filteredLessons]);

  const handleClick = useCallback((e, node) => {
    if (node.type !== "lesson") {
      setZoom(node.id);
      // handleMoveCenterNode(node);
    }
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
        nodesDraggable={false}
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
        <Controls showInteractive={false} />
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
  handleModal: PropTypes.func,
  zoomLesson: PropTypes.object,
  isFilter: PropTypes.bool,
  isSearch: PropTypes.bool
};

// function Flow(props) {
//   return (<ReactFlowProvider>
//     <SaveRestore {...props}/>
//   </ReactFlowProvider>);
// };

export default Flow;
