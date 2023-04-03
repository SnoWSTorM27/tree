import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId() },
  isLoggedIn: true,
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: null,
  isLoggedIn: false,
  dataLoaded: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    userRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities = action.payload;
    },
    userUpdated: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = false;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    }
  }
});

const { actions, reducer: userReducer } = userSlice;
const {
  userRequested,
  userReceived,
  userRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  userUpdated
} = actions;

export const loadCurrentUser = () => async (dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await userService.getCurrentUser();
    dispatch(userReceived(content));
  } catch (error) {
    dispatch(userRequestFailed(error.message));
  }
};

// const userUpdateRequested = createAction("user/userUpdateRequested");
// const updateUserFailed = createAction("user/updateUserFailed");

export const loginYandex = (code) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.loginYandex(code);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push("/");
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

// export const updateUserData = (payload) => async (dispatch) => {
//   dispatch(userUpdateRequested());
//   try {
//     const { content } = await userService.update(payload);
//     dispatch(userUpdated(content));
//     history.push(`/users/${content._id}`);
//   } catch (error) {
//     dispatch(updateUserFailed(error.message));
//   }
// };

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  localStorageService.removeOrder();
  dispatch(userLoggedOut());
  history.push("/");
};

export const getUser = () => (state) => state.user.entities;
export const getCurrentUserData = () => (state) => {
  return state.user.entities;
};
export const getUserLoadingStatus = () => (state) => state.user.isLoading;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getUserDataStatus = () => (state) => state.user.dataLoaded;
export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getAuthErrors = () => (state) => state.user.error;

export default userReducer;
