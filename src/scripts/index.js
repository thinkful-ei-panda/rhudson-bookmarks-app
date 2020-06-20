import $ from 'jquery';
import './styles/index.css';
import api from './api.js';
import state from './state.js';
import bookmarkList from './bookmark-list.js';

const main = function() {
  api.GET()
    .then((bookmarks) => {
      bookmarks.forEach((bkmk) => state.addBookmark(bkmk));
      bookmarkList.render();
    });
  bookmarkList.bindEventListeners();
  bookmarkList.render();
};

$(main);