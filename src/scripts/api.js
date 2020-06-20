const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rebecca/bookmarks/';

const listAPIFetch = function (...args) {
  let error;
  return fetch (...args)
    .then (response => {
      if (!response.ok) {
        error = {code: response.status};
        if (!response.headers.get('content-type').includes('json')) {
          error.message = response.statusText;
          return Promise.reject(error);
        }
      }
      return response.json();
    })
    .then(data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};


const GET = function() {
  return listAPIFetch(`${BASE_URL}`);
};


const POST = function(jsonStringifiedFormData) {
  return listAPIFetch(`${BASE_URL}`, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': jsonStringifiedFormData
  });
};

const deleteAPI = function(bookmarkID) {
  return listAPIFetch(`${BASE_URL}${bookmarkID}`, {
    'method': 'DELETE'
  });
};

const PATCH = function(jsonStringifiedFormData, bookmarkID) {
  return listAPIFetch(`${BASE_URL}${bookmarkID}`, {
    'method': 'PATCH',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': jsonStringifiedFormData
  });
};

export default {
  listAPIFetch,
  GET,
  POST,
  deleteAPI,
  PATCH
};