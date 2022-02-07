import { RootState } from "./index";
import { bootstrapUser } from "./../context/auth-context";
import { createSlice } from "@reduxjs/toolkit";
import { IAuthForm } from "context/auth-context";
import { IUser } from "screens/project-list/search-panel";
import { AppDispatch } from "store";
import * as auth from "auth-provider";

interface State {
  user: IUser | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: IAuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

export const register = (form: IAuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => setUser(user));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
