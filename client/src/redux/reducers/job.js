import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const jobReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("jobCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("jobCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.job = action.payload;
      state.success = true;
    })
    .addCase("jobCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // Uncomment and update the following cases if needed
    /*
    .addCase("getAllJobsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllJobsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
    })
    .addCase("getAllJobsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("deleteJobRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteJobSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteJobFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllJobsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllJobsSuccess", (state, action) => {
      state.isLoading = false;
      state.alljobs = action.payload;
    })
    .addCase("getAllJobsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    */
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
