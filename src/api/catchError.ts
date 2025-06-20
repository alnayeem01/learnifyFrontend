import {AxiosError} from 'axios';

const catchAsyncError = (error: any): string => {
  let errorMessage = error.message;

  if (AxiosError) {
    const errorResponse = error.response?.data;
    if (errorResponse) {
      errorMessage = errorResponse.error;
    }
  }
  return errorMessage;
};

export default catchAsyncError;
