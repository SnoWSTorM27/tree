import { createSlice } from "@reduxjs/toolkit";
import nodeService from "../services/node.service";
// import nds from "./response.json";

const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
  },
  reducers: {
    nodesRequested: (state) => {
      state.isLoading = true;
    },
    nodesReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    nodesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    nodesUpdateRequested: (state) => {
      state.isLoading = true;
    },
    nodesUpdated: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    nodesUpdateFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: nodesReducer } = nodesSlice;
const { nodesRequested, nodesReceived, nodesRequestFailed, nodesUpdateRequested, nodesUpdated, nodesUpdateFailed } = actions;

export const loadNodesList = () => async (dispatch, getState) => {
  dispatch(nodesRequested());
  try {
    const { content } = await nodeService.fetchAll();
    dispatch(nodesReceived(content));
  } catch (error) {
    dispatch(nodesRequestFailed(error.message));
  }
};
export const updateNodesList = (payload) => async (dispatch, getState) => {
  dispatch(nodesUpdateRequested());
  try {
    const { content } = await nodeService.update({ items: payload });
    dispatch(nodesUpdated(payload));
  } catch (error) {
    dispatch(nodesUpdateFailed(error.message));
  }
};

export const getNodes = () => (state) => state.nodes.entities;
export const getNodesLoadingStatus = () => (state) =>
  state.nodes.isLoading;
export const getNodesDataStatus = () => (state) => state.nodes.dataLoaded;
export const getNodeById = (id) => (state) => {
  if (state.nodes.entities) {
    return state.nodes.entities.find((node) => node._id === id);
  }
};
export const getNodeNameByNode = (node) => (state) => {
  if (state.nodes.entities) {
    return state.nodes.entities.find((s) => s.node === node);
  }
};

export default nodesReducer;
