import axios from "axios";
import {
  API_NOTIFICATION_MESSAGES,
  SERVICE_URLS,
} from "../constants/config.js";

//make single api with api interseptors

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create(
  //make api and save it in an instance
  {
    baseURL: API_URL,
    timeout: 10000, //if delayed and api goes in pending then timeout
    headers: {
      "Content-Type": "application/json",
    },
  }
);

axiosInstance.interceptors.request.use(
  //intercept request
  function (config) {
    //first callback fun. in case of successful
    return config;
  },
  function (error) {
    //second callback fun. in case of successful
    return Promise.reject(error);
  }
);

//at the strat pf api loader is shown

axiosInstance.interceptors.response.use(
  //intercept response
  function (response) {
    //Stop global loader here
    return processResponse(response);
  },
  function (error) {
    //Stop global loader here
    return Promise.reject(processError(error));
  }
);

// -------------------------------------------------------------------
// if success -> return {isSuccess: true, data: object} //200 around 202, 204
// if error -> return {isFailure: true, status: string, msg: string, code: int}
//--------------------------------------------------------------------

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

// -------------------------------------------------------------------
// if success -> return {isSuccess: true, data: object} //200 around 202, 204
// if error -> return {isFailure: true, status: string, msg: string, code: int}
//--------------------------------------------------------------------

const processError = (error) => {
  if (error.response) {
    //if get response in error
    //request made successfully but server responded with status code other than 200
    //i.e. that falls out of the range of 2.x.x range
    // console.log("ERROR IN RESPONSE:", error.toJSON());
    console.log("ERROR IN RESPONSE:", error.response);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status, //error code from backend
    };
  } else if (error.request) {
    //if get request in error
    //request made successfully but no response was received from the server
    // console.log("ERROR IN REQUSET:", error.toJSON());
    console.log("ERROR IN REQUSET:", error.request);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    //if gets nothing in error
    //something happened in setting up request that triggers an erro
    //i.e. some problem in frontend
    // console.log("ERROR IN NETWORK:", error.toJSON());
    console.log("ERROR IN RESPONSE:", error);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

// const API = {};

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//   //value is object here
//   //for of loop cuz we are using objects. gives each objech with its key value pair one by one
//   API[key] = (body, showUploadProgress, showDownloadProgress) => {
//     //showUploadProgress and showDownloadProgress is used for a bar that goes from 1 to 100 for loader
//     axiosInstance({
//       method: value.method, //obj.property
//       url: value.url,
//       data: body,
//       responseType: value.responseType,
//       onUploadProgress: function (progress) {
//         if (showUploadProgress) {
//           let percentageCompleted = Math.round(
//             (ProgressEvent.loaded * 100) / ProgressEvent.total
//           ); //value of progressEvent lies b/ 0 and 1
//           showUploadProgress(percentageCompleted);
//         }
//       },
//       onDownloadProgress: function (progress) {
//         if (showDownloadProgress) {
//           let percentageCompleted = Math.round(
//             (ProgressEvent.loaded * 100) / ProgressEvent.total
//           ); //value of progressEvent lies b/ 0 and 1
//           showDownloadProgress(percentageCompleted);
//         }
//       },
//     });
//   };
// }

// export { API };

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    return new Promise((resolve, reject) => {
      axiosInstance({
        method: value.method,
        url: value.url,
        data: body,
        responseType: value.responseType,
        onUploadProgress: function (progress) {
          if (showUploadProgress) {
            let percentageCompleted = Math.round(
              (progress.loaded * 100) / progress.total
            );
            showUploadProgress(percentageCompleted);
          }
        },
        onDownloadProgress: function (progress) {
          if (showDownloadProgress) {
            let percentageCompleted = Math.round(
              (progress.loaded * 100) / progress.total
            );
            showDownloadProgress(percentageCompleted);
          }
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .then((response) => {
          resolve(processResponse(response));
        })
        .catch((error) => {
          reject(processError(error));
        });
    });
  };
}

console.log(API);

// if you look in the browser dev tools, you'll notice that the call to httpstat.us/500 errors during the OPTIONS pre-flight request (an automated network call in modern browsers when using CORS). When making a cross-domain request, if the server isn't correctly configured for CORS, axios returns an error without error.response populated. This is because the XHR request fails at the browser level (during the OPTIONS call), which is technically a network error. For network errors, axios does not provide a response because one is not provided by the browser. If one debugs the network error returned to axios from an invalid OPTIONS call, one will notice that there is no way to know the status.
//thus added
// validateStatus: (status) => {
//     return true; // I'm always returning true, you may want to do it depending on the status received
//   },

export { API };

//commented out code was incorrect and chat gpt gave below ans. thta is correct
// The issue seems to be in the API object construction in api.js. The API object is constructed using a loop that iterates over the SERVICE_URLS object. However, the function assigned to each key in the API object does not return anything explicitly, which means it returns undefined by default.
// To fix this issue, you need to make sure that the functions assigned to each key in the API object return a promise so that when you await them in your signupUser function, you get the response back.
