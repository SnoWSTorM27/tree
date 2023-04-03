import { createSlice } from "@reduxjs/toolkit";
import lessonService from "../services/lesson.service";

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
  },
  reducers: {
    lessonsRequested: (state) => {
      state.isLoading = true;
    },
    lessonsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    lessonsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: lessonsReducer } = lessonsSlice;
const { lessonsRequested, lessonsReceived, lessonsRequestFailed } = actions;

export const loadLessonsList = () => async (dispatch, getState) => {
  dispatch(lessonsRequested());
  try {
    const { content } = await lessonService.fetchAll();
    dispatch(lessonsReceived(content));
  } catch (error) {
    dispatch(lessonsRequestFailed(error.message));
  }
};

export const getLessons = () => (state) => state.lessons.entities;
export const getLessonsLoadingStatus = () => (state) =>
  state.lessons.isLoading;
export const getLessonsDataStatus = () => (state) => state.lessons.dataLoaded;
export const getLessonById = (id) => (state) => {
  if (state.lessons.entities) {
    return state.lessons.entities.find((lesson) => lesson._id === id);
  }
};
export const getLessonsBySubsection = (subsection) => (state) => {
  if (state.lessons.entities) {
    return state.lessons.entities.filter((lesson) => lesson.subsection === subsection);
  }
};

export default lessonsReducer;
