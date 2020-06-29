/* eslint-disable no-console */
import $ from "jquery";
import state from "./state";
import api from "./api";
import generate from "./generate";

const renderError = function () {
  if (state.error) {
    const el = generateError(state.error);
    $(".error-container").html(el);
  } else {
    $(".error-container").empty();
  }
};

const handleCloseError = function () {
  $(".error-container").on("click", "#cancel-error", () => {
    state.setError(null);
    renderError();
  });
};

const render = function () {
  console.log(`render started`);
  let bookmarks =
    state.filter > 0
      ? state.bookmarks.filter((bookmark) => bookmark.rating >= state.filter)
      : state.bookmarks;
  $("main").html(generate.mainHTMLGenerator(bookmarks));
  console.log(`render ran`);
  console.log(state.bookmarks);
};

/********** EVENT HANDLER FUNCTIONS **********/

const handleAddBtn = function () {
  console.log(`handleAddBtn started`);
  $("#add-btn").click((event) => {
    state.toggleProperty(state, "adding");
    state.error = null;
    render();
    console.log(`handleAddBtn ran`);
  });
};

const submitAddForm = function () {
  console.log(`submitAddForm started`);
  $("main").submit((event) => {
    event.preventDefault();

    const newBookmark = {};
    newBookmark.title = $("#title").val();
    newBookmark.url = $("#url").val();
    newBookmark.desc = $("#description").val();
    newBookmark.rating = $("input[name='rating3']:checked").val();

    console.log(`bookmark rating: ${newBookmark.rating}`);
    api
      .POST(newBookmark)
      .then((data) => {
        data["expand"] = false;
        state.bookmarks.push(data);
        state.toggleProperty(state, "adding");
        render();
      })
      .catch((error) => {
        state.error = error.message;
        renderError();
        console.log(`submitAddForm ERROR`);
      });
  });
};

const handleDeleteBtn = function () {
  console.log(`handleDeleteBtn started`);
  $("body").on("click", "#delete-btn", (event) => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .data("item-id");
    console.log(bookmarkID);
    const currentBookmark = state.findById(bookmarkID);
    console.log("this is bookmark" + currentBookmark.id);
    api.deleteAPI(bookmarkID).then(() => {
      state.deleteBookmark(currentBookmark.id);
      render();
    });
    console.log(state.bookmarks);
  });
};

const expandCollapseBtn = function () {
  console.log(`expandCollapseBtn started`);
  $("body").on("click", ".exp-col-btn", (event) => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .data("item-id");
    console.log(bookmarkID);
    const currentBookmark = state.findById(bookmarkID);

    let toggledBookmark = state.toggleProperty(currentBookmark, "expand");
    state.editBookmark(bookmarkID, toggledBookmark);
    render();
  });
};

const handleFilterSelect = function () {
  console.log(`handleFilterSelect started`);
  $("#filter-select").change((event) => {
    state.filter = $("option:selected").val();
    console.log(state.filter);
    render();
    console.log(`handleFilterSelect ran`);
  });
};

const starRating = function () {
  console.log(`starRating started`);
  $;

  console.log(`starRating ran`);
};

const bindEventListeners = function () {
  renderError();
  handleCloseError();
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
