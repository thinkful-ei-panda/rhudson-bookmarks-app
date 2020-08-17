/* eslint-disable no-console */
import $ from "jquery";
import state from "./state";
import api from "./api";
import generate from "./generate";

const render = function () {
  let bookmarks =
    state.filter > 0
      ? state.bookmarks.sort((a, b) => b.id - a.id).filter((bookmark) => bookmark.rating >= state.filter)
      : state.bookmarks;
  $("main").html(generate.mainHTMLGenerator(bookmarks));
};

/********** EVENT HANDLER FUNCTIONS **********/

const handleAddBtn = function () {
  $("#add-btn").click((event) => {
    state.toggleProperty(state, "adding");
    state.error = null;
    render();
  });
};

const submitAddForm = function () {
  $("main").submit((event) => {
    event.preventDefault();

    const newBookmark = {};
    newBookmark.title = $("#title").val();
    newBookmark.url = $("#url").val();
    newBookmark.desc = $("#description").val();
    newBookmark.rating = $("input[name='rating']:checked").val();
    newBookmark.favicon = $("bookmark.url") + '/favicon.ico';
    api
      .POST(newBookmark)
      .then((data) => {
        data["expand"] = false;
        state.bookmarks.push(data);
        state.toggleProperty(state, "adding");
        render();
      })
      .catch(err=>{
        $('.add-error-container').text('Something went wrong, please try again.')
      })
  });
};

const handleDeleteBtn = function () {
  $(".bookmark-wrapper").on("click", ".delete-btn", (event) => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .data("item-id");
    const currentBookmark = state.findById(bookmarkID);    
    api
      .deleteAPI(bookmarkID)
      .then(() => {
        state.deleteBookmark(currentBookmark.id);
        render();
      })
      .catch((error) => {        
        $('.delete-error-container').text('Something went wrong, please try again.')
      });
  });
};

const expandCollapseBtn = function () {
  $("body").on("click", ".exp-col-btn", (event) => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .data("item-id");

    const currentBookmark = state.findById(bookmarkID);

    let toggledBookmark = state.toggleProperty(currentBookmark, "expand");
    render();
  });
};

const handleFilterSelect = function () {
  $("#filter-select").change((event) => {
    state.filter = $("option:selected").val();
    render();
  });
};

const bindEventListeners = function () {
  handleAddBtn();
  submitAddForm();
  handleDeleteBtn();
  expandCollapseBtn();
  handleFilterSelect();
};

export default {
  bindEventListeners,
  render,
};
