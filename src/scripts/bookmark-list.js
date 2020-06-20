/* eslint-disable no-console */
import $ from "jquery";
import state from "./state";
import api from "./api";
import generate from "./generate";

const render = function () {
  let bookmarks =
    state.filter > 0
      ? state.bookmarks.filter((bookmark) => bookmark.rating >= state.filter)
      : state.bookmarks;
  $("main").html(generate.mainHTMLGenerator(bookmarks));
};

// const handleCloseError = function () {
//   $('.error-container').on('click', '#cancel-error', () => {
//     state.setError(null);
//     renderError();
//   });
// };

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
const generateRatings = function (value) {
  let bookmarkRating = "";
  for (let i = 0; i < value; i++) {
    bookmarkRating += '<img src="images/star.jpg" alt="star">';
  }
  return bookmarkRating;
};

const handleAddBtn = function () {
  $("#add-btn").click((event) => {
    state.toggleProperty(state, "adding");
    state.error = null;
    render();
  });
  console.log(`handleAddBtn ran`);
};

const submitAddForm = function () {
  $("#add-bookmark-form").submit((event) => {
    event.preventDefault();

    $.fn.extend({
      serializeJSON: function () {
        const formData = new FormData(this[0]);
        const jsFormData = {};
        formData.forEach((val, name) => (jsFormData[name] = val));
        return JSON.stringify(jsFormData);
      },
    });
    const jsonStringifiedFormData = $("#add-bookmark-form").serializeJSON();

    api
      .POST(jsonStringifiedFormData)
      .then((data) => {
        data["expand"] = false;
        data["edit"] = false;
        state.bookmarks.push(data);
        state.toggleProperty(state, "adding");
        render();
      })
      .catch((error) => {
        state.error = error.message;
        render();
      });
  });
  console.log(`submitAddForm ran`);
};

const handleEditBtn = function () {
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
  });
  console.log(`handleEditBtn ran`);
};

const submitEditForm = function () {
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
      .patch(jsonStringifiedFormData, bookmarkID)
      .then(() => {
        state.toggleProperty(state, "edit");
        state.error = null;
        render();
      })
      .catch((error) => {
        state.error = error.message;
        render();
      });
  });
  console.log(`submitEditForm ran`);
};

const handleDeleteBtn = function () {
  $("#delete-btn").click((event) => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .find("bookmark-el")
      .attr("id");
    const currentBookmark = state.findByID(bookmarkID);
    state.deleteBookmark(currentBookmark);
    api.deleteAPI(bookmarkID);
    render();
  });
  console.log(`handleDeleteBtn ran`);
};

const expandCollapseBtn = function () {
  $("#exp-col-btn").click((event) => {
    const bookmarkID = $(event.currentTarget)
      .closest(".bookmark-group")
      .find(".bookmark-el")
      .attr("id");
    const currentBookmark = state.findByID(bookmarkID);
    state.toggleProperty(currentBookmark, "expand");
    render();
  });
  console.log(`expandCollapseBtn ran`);
};

const handleFilterSelect = function () {
  $("#filter-select").change((event) => {
    state.filter = $("option:selected").val();
    console.log(state.filter);
    render();
  });
  console.log(`handleFilterSelect ran`);
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
  generateRatings();
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
