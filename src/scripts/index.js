import $ from "jquery";
import api from "./api.js";
import "../styles/index.css";
import state from "./state.js";
import bookmarkList from "./bookmark-list.js";

const main = function () {
  api.GET().then((bookmarks) => {
    state.loadBookmarks(bookmarks);
    bookmarkList.render();
    bookmarkList.bindEventListeners();
  });
};

$(main);
