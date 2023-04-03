import { createSlice } from "@reduxjs/toolkit";
import sectionService from "../services/section.service";

const sectionsSlice = createSlice({
  name: "sections",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
  },
  reducers: {
    sectionsRequested: (state) => {
      state.isLoading = true;
    },
    sectionsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    sectionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: sectionsReducer } = sectionsSlice;
const { sectionsRequested, sectionsReceived, sectionsRequestFailed } = actions;

export const loadSectionsList = () => async (dispatch, getState) => {
  dispatch(sectionsRequested());
  try {
    const { content } = await sectionService.fetchAll();
    dispatch(sectionsReceived(content));
  } catch (error) {
    dispatch(sectionsRequestFailed(error.message));
  }
};

export const getSections = () => (state) => state.sections.entities;
export const getSectionsLoadingStatus = () => (state) =>
  state.sections.isLoading;
export const getSectionsDataStatus = () => (state) => state.sections.dataLoaded;
export const getSectionById = (id) => (state) => {
  if (state.sections.entities) {
    return state.sections.entities.find((section) => section._id === id);
  }
};
export const getSectionNameBySection = (section) => (state) => {
  if (state.sections.entities) {
    return state.sections.entities.find((s) => s.section === section);
  }
};

export default sectionsReducer;
