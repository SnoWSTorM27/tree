import { createSlice } from "@reduxjs/toolkit";
import subsectionService from "../services/subsection.service";

const subsectionsSlice = createSlice({
  name: "subsections",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
  },
  reducers: {
    subsectionsRequested: (state) => {
      state.isLoading = true;
    },
    subsectionsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    subsectionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: subsectionsReducer } = subsectionsSlice;
const { subsectionsRequested, subsectionsReceived, subsectionsRequestFailed } = actions;

export const loadSubsectionsList = () => async (dispatch, getState) => {
  dispatch(subsectionsRequested());
  try {
    const { content } = await subsectionService.fetchAll();
    dispatch(subsectionsReceived(content));
  } catch (error) {
    dispatch(subsectionsRequestFailed(error.message));
  }
};

export const getSubsections = () => (state) => state.subsections.entities;
export const getSubsectionsLoadingStatus = () => (state) =>
  state.subsections.isLoading;
export const getSubsectionsDataStatus = () => (state) => state.subsections.dataLoaded;
export const getSubsectionById = (id) => (state) => {
  if (state.subsections.entities) {
    return state.subsections.entities.find((subsection) => subsection._id === id);
  }
};
export const getSubsectionBySection = (section) => (state) => {
  if (state.subsections.entities) {
    return state.subsections.entities.filter((subsection) => subsection.section === section);
  }
};
export const getSubsectionNameBySubsection = (subsection) => (state) => {
  if (state.subsections.entities) {
    return state.subsections.entities.find((s) => s.subsection === subsection);
  }
};

export default subsectionsReducer;
