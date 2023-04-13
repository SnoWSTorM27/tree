import React, { useState, useEffect } from "react";
import Loader from "../common/loader";
import "./tree.css";
import SearchField from "../common/searchField";
import { ReactFlowProvider } from "reactflow";
import Flow from "../common/flow/flow";
import { useSelector } from "react-redux";
import { getSections, getSectionsLoadingStatus } from "../../store/sections";
import { getNodes, getNodesLoadingStatus } from "../../store/nodes";
import ModalWindow from "../common/modalWindow";
import LessonsList from "../ui/lessonList";
import TagsList from "../ui/tagsList";
import nodes from "../../store/nodes.json";

function Tree() {
  // const sections = useSelector(getSections());
  // const sectionsStatusLoading = useSelector(getSectionsLoadingStatus());
  const nodes = useSelector(getNodes());
  const nodesStatusLoading = useSelector(getNodesLoadingStatus());
  // const nodesStatusLoading = false;
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [tags, setTags] = useState();
  const [searchLessons, setSearchLessons] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  // const nodes = nds.filter(node => node.type !== "lesson");
  const lessons = nodes.filter(node => node.type === "lesson");
  // console.log(lessons);
  const set = new Set();
  // const categories = [{ _id: "1", name: "8 класс" }, { _id: "2", name: "7 класс" }];

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
    if (nodes) {
      setIsLoading(false);
      const lsns = lessons.map(lesson => {
        return { ...lesson, tags: lesson.tags.split(",").filter(el => !!el) };
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

  const handleModal = (item) => {
    setData(item);
    setModalShow(true);
  };

  // const clearFilter = () => {
  //   setSelectedCategory();
  //   setSearchLessons("");
  // };

  if (lessons && tags) {
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
              <ReactFlowProvider>
                {!nodesStatusLoading
                  // ? <Flow sections={nodes} filteredLessons={filteredLessons} selectedCategory={selectedCategory} handleModal={handleModal}/>
                  ? <Flow sections={nodes} handleModal={handleModal} filteredLessons={filteredLessons} selectedCategory={selectedCategory}/>
                  : <Loader />}
              </ReactFlowProvider>
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

export default Tree;
