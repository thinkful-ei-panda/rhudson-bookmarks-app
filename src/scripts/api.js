const BASE_URL = "https://thinkful-list-api.herokuapp.com/rebecca/bookmarks/";

const listAPIFetch = function (...args) {
  let error;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        error = {
          code: res.status
        };
      }    
      return res.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    })
};

const GET = function () {
  return listAPIFetch(`${BASE_URL}`);
};

const POST = function (bookmark) {
  
  return listAPIFetch(`${BASE_URL}`, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(bookmark)
  });
};

const deleteAPI = function (bookmarkID) {
  return listAPIFetch(`${BASE_URL}${bookmarkID}`, {
    'method': 'DELETE',
    'headers': { 'Content-Type': 'application/json' }
  });
};

export default {
  listAPIFetch,
  GET,
  POST,
  deleteAPI,
};
