import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const employerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadEmployerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadEmployerSuccess", (state, action) => {
      state.isEmployer = true;
      state.isLoading = false;
      state.employer = action.payload;
    })
    .addCase("LoadEmployerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isEmployer = false;
    })
    .addCase("getAllEmployersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEmployersSuccess", (state, action) => {
      state.isLoading = false;
      state.employers = action.payload;
    })
    .addCase("getAllEmployerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
