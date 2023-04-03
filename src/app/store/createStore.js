import { combineReducers, configureStore } from "@reduxjs/toolkit";
import lessonsReducer from "./lessons";
import nodesReducer from "./nodes";
import sectionsReducer from "./sections";
import subsectionsReducer from "./subsections";
import userReducer from "./user";

const rootReducer = combineReducers({
  sections: sectionsReducer,
  user: userReducer,
  subsections: subsectionsReducer,
  lessons: lessonsReducer,
  nodes: nodesReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
