import { createAction } from "redux-actions";
import {
  DELETE_INQUIRY_FAIL,
  DELETE_INQUIRY_REQUEST,
  DELETE_INQUIRY_SUCCESS,
  GET_INQUIRIES_FAIL,
  GET_INQUIRIES_REQUEST,
  GET_INQUIRIES_SUCCESS
} from "~/constants/actions";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";

const getInquiriesRequest = createAction(GET_INQUIRIES_REQUEST);
const getInquiriesFail = createAction(GET_INQUIRIES_FAIL);
const getInquiriesSuccess = createAction(GET_INQUIRIES_SUCCESS);
const deleteInquiryRequest = createAction(DELETE_INQUIRY_REQUEST);
const deleteInquirySuccess = createAction(DELETE_INQUIRY_SUCCESS);
const deleteInquiryFail = createAction(DELETE_INQUIRY_FAIL);

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

export function deleteInquiry(inquiryId) {
  return async (dispatch, getState) => {
    dispatch(deleteInquiryRequest());
    try {
      const response = await axiosInstance.delete(
        api.inquiries.show(inquiryId)
      );
      dispatch(deleteInquirySuccess(response.data));
    } catch (error) {
      console.log("ERROR GET INQUIRIES", error);
      dispatch(deleteInquiryFail(error));
    }
  };
}
