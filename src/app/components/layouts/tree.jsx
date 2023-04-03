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

function Tree() {
  // const sections = useSelector(getSections());
  // const sectionsStatusLoading = useSelector(getSectionsLoadingStatus());
  const nodes = useSelector(getNodes());
  const nodesStatusLoading = useSelector(getNodesLoadingStatus());
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [tags, setTags] = useState();
  const [searchLessons, setSearchLessons] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const lessons = nodes.filter(node => node.type === "lesson");
  const set = new Set();
  // const categories = [{ _id: "1", name: "8 класс" }, { _id: "2", name: "7 класс" }];

  const handleCategorySelect = (item) => {
    if (searchLessons !== "") setSearchLessons("");
    setSelectedCategory(item);
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
      lessons.forEach(lesson => lesson.tags.forEach(tag => set.add(tag)));
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

  const clearFilter = () => {
    setSelectedCategory();
    setSearchLessons("");
  };

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
                <button className="btn btn-secondary mx-1" onClick={clearFilter}>
                  Очистить
                </button>
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
                  ? <Flow sections={nodes} filteredLessons={filteredLessons} selectedCategory={selectedCategory} handleModal={handleModal}/>
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