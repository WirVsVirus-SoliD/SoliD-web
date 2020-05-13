import { createAction } from "redux-actions";
import {
  GET_INQUIRIES_FAIL,
  GET_INQUIRIES_REQUEST,
  GET_INQUIRIES_SUCCESS
} from "~/constants/actions";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";

const getInquiriesRequest = createAction(GET_INQUIRIES_REQUEST);
const getInquiriesFail = createAction(GET_INQUIRIES_FAIL);
const getInquiriesSuccess = createAction(GET_INQUIRIES_SUCCESS);

export function getInquiries() {
  return async (dispatch, getState) => {
    dispatch(getInquiriesRequest());
    try {
      const response = await axiosInstance.get(api.inquiries.collection);
      dispatch(getInquiriesSuccess(response.data));
    } catch (error) {
      console.log("ERROR GET INQUIRIES", error);
      dispatch(getInquiriesFail(error));
    }
  };
}
