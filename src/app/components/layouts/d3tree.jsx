import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
// import initData from "./initData.json";
import { useCenteredTree } from "../../utils/utils";
import { useSelector } from "react-redux";
import { getNodes, getNodesLoadingStatus } from "../../store/nodes";
import { transformd3Data } from "../../utils/transformd3Data";
import { transformLessons } from "../../utils/transformLessons";
import Loader from "../common/loader";
import ModalWindow from "../common/modalWindow";
import LessonsList from "../ui/lessonList";
import TagsList from "../ui/tagsList";
import SearchField from "../common/searchField";
// import "./styles.css";

const containerStyles = {
  width: "100vw",
  height: "100vh"
};
const getDynamicPathClass = ({ source, target }, orientation) => {
  console.log(target);
  if (!target.children && target.attributes) {
    // Target node has no children -> this link leads to a leaf node.
    return "link__to-leaf";
  }

  // Style it as a link connecting two branch nodes by default.
  return "link__to-branch";
};
const renderRectSvgNode = ({ nodeDatum, toggleNode, handleModal }) => (
  <g>
    <rect width="20" height="20" y="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="-30" y="-20" onClick={() => handleModal(nodeDatum)}>
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
  // const nodesStatusLoading = useSelector(getNodesLoadingStatus());
  const nodesStatusLoading = false;
  const tree = transformd3Data(nodes);
  // console.log("data", data);
  const [dimensions, translate, containerRef] = useCenteredTree();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [tags, setTags] = useState();
  const [searchLessons, setSearchLessons] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const lessons = transformLessons(nodes);
  const set = new Set();

  const handleCategorySelect = (item) => {
    if (searchLessons !== "") setSearchLessons("");
    setSelectedCategory(item);
    if (JSON.stringify(item) === JSON.stringify(selectedCategory)) setSelectedCategory();
  };

  useEffect(() => {
    if (selectedCategory) {
      setSearchLessons("");
    } else if (searchLessons) {
      setSelectedCategory();
    }
  }, [selectedCategory, searchLessons]);

  useEffect(() => {
    if (lessons) {
      setIsLoading(false);
      const lsns = lessons.map(lesson => {
        return { ...lesson, tags: lesson.tags.split(",").filter(item => !!item) };
      });
      lsns.forEach(lesson => lesson.tags.forEach(tag => {
        tag.trim();
        set.add(tag);
      }));
      set.delete(undefined);
      setTags(set);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSelectedCategory(undefined);
    const { value } = e.target;
    setSearchLessons(value);
  };

  const handleModal = (nodeDatum) => {
    console.log(nodeDatum);
    if (nodeDatum.__rd3t.depth === 3) {
      setData({ data: { ...nodeDatum.attributes, name: nodeDatum.name } });
      setModalShow(true);
    }
  };

  if (lessons && tags && nodes) {
    function filterLessons(data) {
      const filteredLessons = searchLessons
        ? data.filter(
          (lesson) =>
            lesson.name
              .toLowerCase()
              .indexOf(searchLessons.toLowerCase()) !== -1
        )
        : selectedCategory
          ? data.filter(
            (lesson) =>
              lesson.tags.includes(selectedCategory)
          )
          : data;
      return filteredLessons;
    }

    const filteredLessons = filterLessons(lessons);

    return (
      <>
        <div className="container-fluid">
          <div className="row gutters-md">
            <div className="card p-1 bg-info mb-2 col-md-5">
              <SearchField
                label="Поиск урока"
                name="search"
                value={searchLessons}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                {/* <button className="btn btn-secondary mx-1" onClick={clearFilter}>
                  Очистить
                </button> */}
                <TagsList
                  selectedItem={selectedCategory}
                  items={tags}
                  onItemSelect={handleCategorySelect}
                />
              </div>
            </div>
          </div>
          <div className="row gutters-md">
            <div className="col-md-2 border border-info card">
              <h3 className="text-center card-header nowrap">Список уроков</h3>
              {!isLoading ? <LessonsList lessons={filteredLessons}/> : <Loader />}
            </div>
            <div className="tree col-md-10">
              {/* {!nodesStatusLoading
                ? <Flow sections={nodes} filteredLessons={filteredLessons} selectedCategory={selectedCategory} handleModal={handleModal}/>
                : <Loader />} */}
              <div style={containerStyles} ref={containerRef}>
                <Tree
                  data={tree}
                  dimensions={dimensions}
                  translate={translate}
                  orientation="horizontal"
                  nodeSize={{ x: 600, y: 50 }}
                  initialDepth="2"
                  pathClassFunc={getDynamicPathClass}
                  // renderCustomNodeElement={renderRectSvgNode}
                  renderCustomNodeElement={(rd3tProps) =>
                    renderRectSvgNode({ ...rd3tProps, handleModal })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {modalShow && <ModalWindow
          payload={data}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />}
      </>
    );
  } return <Loader />;
}

export default D3tree;
