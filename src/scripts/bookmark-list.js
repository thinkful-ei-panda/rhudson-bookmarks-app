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
    state.filter > 0 ?
    state.bookmarks.filter((bookmark) => bookmark.rating >= state.filter) :
    state.bookmarks;
  $("main").html(generate.mainHTMLGenerator(bookmarks));
  console.log(`render ran`);
};

// const handleCloseError = function () {
//   $('.error-container').on('click', '#cancel-error', () => {
//     state.setError(null);
//     renderError();
//   });
// };

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)


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

    // $.fn.extend({
    //   serializeJSON: function () {
    //     const formData = new FormData(this[0]);
    //     const jsFormData = {};
    //     formData.forEach((val, name) => (jsFormData[name] = val));
    //     return JSON.stringify(jsFormData);
    //   },
    // });
    // const jsonStringifiedFormData = $("#add-bookmark-form").serializeJSON();

    const newBookmark = {};
    newBookmark.title = $("#title").val();
    newBookmark.url = $("#url").val();
    newBookmark.desc = $("#description").val();
    newBookmark.rating = $("#rating :selected").val();

    api.POST(newBookmark)
      .then((data) => {
        data["expand"] = false;
        data["edit"] = false;
        state.bookmarks.push(data);
        state.toggleProperty(state, "adding");
        render();
        console.log(state.bookmarks);
      })
      .catch((error) => {
        state.error = error.message;
        renderError();
        console.log(`submitAddForm ERROR`);
      });
  });
};

const handleEditBtn = function () {
  console.log(`handleEditBtn started`);
  $("#edit-btn").click((event) => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .find(".bookmark-el")
      .attr("id");
    const currentBookmark = state.findById(bookmarkID);
    state.toggleProperty(state, "edit");
    state.editBookmark = currentBookmark;
    state.error = null;
    render();
    console.log(`handleEditBtn ran`);
  });
};

const submitEditForm = function () {
  console.log(`submitEditForm started`);
  $("#edit-bookmark-form").submit((event) => {
    event.preventDefault();

    const bookmarkID = state.editBookmark.id;
    const currentTargetBookmark = state.editBookmark;
    const editedBookmark = state.editBookmark;

    $.fn.extend({
      serializeJSON: function () {
        const formData = new FormData(this[0]);
        const jsFormData = {};
        formData.forEach((val, name) => (jsFormData[name] = val));
        return jsFormData;
      },
    });

    const jsFormData = $("#edit-bookmark-form").serializeJSON();
    editedBookmark["rating"] = jsFormData["rating"];
    editedBookmark["desc"] = jsFormData["desc"];
    state.editBookmark(currentTargetBookmark, editedBookmark);
    const jsonStringifiedFormData = JSON.stringify(jsFormData);

    api
      .PATCH(jsonStringifiedFormData, bookmarkID)
      .then(() => {
        state.toggleProperty(state, "edit");
        state.error = null;
        render();
        console.log(`submitEditForm PATCH`);
      })
      .catch((error) => {
        state.error = error.message;
        render();
        console.log(`submitEditForm ERROR`);
      });
  });
};

const handleDeleteBtn = function () {
  console.log(`handleDeleteBtn started`);
  $('body').on('click', '#delete-btn', event => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .data('item-id');
    console.log(bookmarkID)
    const currentBookmark = state.findById(bookmarkID);
    console.log('this is bookmark' + currentBookmark.id);
    api.deleteAPI(bookmarkID)
      .then(() => {
        state.deleteBookmark(currentBookmark.id);
        render();
      })
    // console.log(`handleDeleteBtn ran`);
  });
};

const expandCollapseBtn = function () {
  console.log(`expandCollapseBtn started`);
  $("body").on('click', '#edit-btn', event => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .data('item-id');
    const currentBookmark = state.findById(bookmarkID);
    state.toggleProperty(currentBookmark, "expand");
    render();
    console.log(`expandCollapseBtn ran`);
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

// function handleCreateBtn() {
//   create-bookmark

//   console.log(`handleCreateBtn ran`);
// }
// function handleCancelBtn() {
//   cancel-bookmark

//   console.log(`handleCancelBtn ran`);
// }

const bindEventListeners = function () {
  renderError();
  handleCloseError();
  handleAddBtn();
  submitAddForm();
  handleEditBtn();
  submitEditForm();
  handleDeleteBtn();
  expandCollapseBtn();
  handleFilterSelect();
  // handleCreateBtn();
  // handleCancelBtn();
};

export default {
  bindEventListeners,
  render,
};