//API_NOTIFICATION_MESSAGES
//contains config contsants

export const API_NOTIFICATION_MESSAGES = {
  //in case you have a loader
  loading: {
    title: "Loading...",
    message: "Data is being loaded. Please wait.",
  },
  //in case you have a loader and data is loaded
  success: {
    title: "Success",
    message: "Data successfully loaded.",
  },
  //in case of response failure
  responseFailure: {
    title: "Error",
    message: "An error occurred while fetching response from server. Please try again.",
  },
  //in case of request failure
  requestFailure: {
    title: "Error",
    message: "An error occurred while parsing requested data from server.",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect to server. Please check internet connectivity and try again later.",
  }
};

// API SERVICE URL i.e. use api service call as an object
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE",  params: true/false, query: true/false }
//        key                                    value
export const SERVICE_URLS = {
    // userSignin: { url: '/signin', method: 'POST' },
    userSignup: { url: '/signup', method: 'POST' },
    // getAllPosts: { url: '/posts', method: 'GET', params: true },
    // getRefreshToken: { url: '/token', method: 'POST' },
    // uploadFile: { url: 'file/upload', method: 'POST' },
    // createPost: { url: 'create', method: 'POST' },
    // deletePost: { url: 'delete', method: 'DELETE', query: true },
    // getPostById: { url: 'post', method: 'GET', query: true },
    // newComment: { url: '/comment/new', method: 'POST' },
    // getAllComments: { url: 'comments', method: 'GET', query: true },
    // deleteComment: { url: 'comment/delete', method: 'DELETE', query: true },
    // updatePost: { url: 'update', method: 'PUT', query: true }
}
