import axios from "axios";
import { server } from "../../server";

// create job
export const createJob = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "jobCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/job/create-job`,
      newForm,
      config
    );
    dispatch({
      type: "jobCreateSuccess",
      payload: data.job,
    });
  } catch (error) {
    dispatch({
      type: "jobCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All jobs of employer
export const getAllJobsEmployer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllJobsEmployerRequest",
    });

    const { data } = await axios.get(`${server}/job/getAllJobs/${id}`);
    dispatch({
      type: "getAllJobsEmployerSuccess",
      payload: data.jobs,
    });
  } catch (error) {
    dispatch({
      type: "getAllJobsEmployerFailed",
      payload: error.response.data.message,
    });
  }
};

// // delete product of a shop
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProductRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// get all Jobs
export const getAllJobs = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllJobsRequest",
    });

    const { data } = await axios.get(`${server}/job/get-all-jobs`);
    dispatch({
      type: "getAllJobsSuccess",
      payload: data.Jobs,
    });
  } catch (error) {
    dispatch({
      type: "getAllJobsFailed",
      payload: error.response.data.message,
    });
  }
};
