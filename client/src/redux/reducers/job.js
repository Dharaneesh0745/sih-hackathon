import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  jobs: [],
  job: null,
  error: null,
  success: false,
  message: null,
};

export const jobReducer = createReducer(initialState, (builder) => {
  builder
    // Create job
    .addCase("jobCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("jobCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.job = action.payload;
      state.success = true;
      // Optionally, add the newly created job to the jobs array
      state.jobs = [...state.jobs, action.payload];
    })
    .addCase("jobCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all jobs of employer
    .addCase("getAllJobsEmployerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllJobsEmployerSuccess", (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
    })
    .addCase("getAllJobsEmployerFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete a job
    .addCase("deleteJobRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteJobSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      // Optionally, remove the deleted job from the jobs array
      state.jobs = state.jobs.filter((job) => job._id !== action.payload.jobId);
    })
    .addCase("deleteJobFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all jobs (generic, if needed)
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

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    })

    // Reset job state (optional)
    .addCase("resetJobState", (state) => {
      state.job = null;
      state.success = false;
      state.message = null;
    });
});
