import $ from "jquery";
import state from "./state";

const mainHTMLGenerator = function (bookmarks) {
  console.log(state.adding);
  if (state.adding) {
    $("#add-btn").text("Cancel");
    return generateAddHTML();
  } else {
    $("#add-btn").text("Add a Bookmark");
    return generateBookmarkList(bookmarks);
  }
};

const getRatings = function (value) {
  console.log("getRatings started");
  let bookmarkRating = "";
  for (let i = 0; i < value; i++) {
    bookmarkRating += '<i class="fas fa-star"></i>';
  }
  console.log("return bookRating");
  return bookmarkRating;
};

const generateAddHTML = function () {
  return `<section id='add-section' class='bookmark-group'>
      <form id="add-bookmark-form" class="form group">
        <h3 class="item flat-icon"><i class="fas fa-bookmark"></i></h3>
        <div class="error-container"></div>
        <div class="input-group item">
          <label for="title">
            <input type="text" name="bookmark-title" id="title" value="" placeholder="Title" size="30" required>
          </label>

          <label for="url">
            <input type="url" name="bookmark-url" id="url" value="" placeholder="https://www.example.com" size="30" required>
          </label>
        </div>
        <label for="description" class="item">
          <input type="text" name="bookmark-description" id="description" value="" placeholder="Optional notes" size="40">
        </label>

        <div id="rating" class="rating-group item" name="rating">
          <input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio">

          <label aria-label="1 star" class="rating__label" for="rating3-1">
            <i class="rating__icon rating__icon--star fa fa-star"></i>
          </label>
            <input class="rating__input" name="rating3" id="rating3-1" value="1" type="radio">
          <label aria-label="2 stars" class="rating__label" for="rating3-2">
            <i class="rating__icon rating__icon--star fa fa-star"></i>
          </label>
            <input class="rating__input" name="rating3" id="rating3-2" value="2" type="radio">
          <label aria-label="3 stars" class="rating__label" for="rating3-3">
            <i class="rating__icon rating__icon--star fa fa-star"></i>
          </label>
            <input class="rating__input" name="rating3" id="rating3-3" value="3" type="radio">
          <label aria-label="4 stars" class="rating__label" for="rating3-4">
            <i class="rating__icon rating__icon--star fa fa-star"></i>
          </label>
            <input class="rating__input" name="rating3" id="rating3-4" value="4" type="radio">
          <label aria-label="5 stars" class="rating__label" for="rating3-5">
            <i class="rating__icon rating__icon--star fa fa-star"></i>
          </label>
            <input class="rating__input" name="rating3" id="rating3-5" value="5" type="radio">
        </div>

        <button id="create-btn" class="btn btn-secondary item" type="submit"><i class="fas fa-plus"></i></button>
      </form>
    </section>
    <hr />`;
};

const generateBookmarkList = function (bookmarks) {
  console.log("bkmk list generate start");
  const bookmarksListElements = bookmarks.map((bookmark) => {
    console.log("not expanded html");
    return `
    <section id="bookmark-section" class="group bookmark-group" data-item-id="${
      bookmark.id
    }">
      <h3 class="flat-icon item"><i class="fas fa-bookmark"></i></h3>      
      <h2 class="bookmark-el item-double" id="${bookmark.id}">
        <img src="${bookmark.url}/favicon.ico" id="favicon">
        ${bookmark.title}
      </h2> 
      <div id="rating" class="item-double">
        ${getRatings(bookmark.rating)}
      </div>
      <div class="vertical btn-wrapper item">
        <button id="delete-btn" class="btn btn-secondary">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn exp-col-btn btn-secondary">
          <i class="fas fa-caret-down 
          ${bookmark.expand === false ? "fa-rotate-270" : ""}"></i>
        </button>
      </div>
    </section>
    <hr class="${bookmark.expand === true ? "hidden" : ""}"/>

    <div class="expanded-bookmark group ${
      bookmark.expand === false ? "hidden" : ""
    }">
      <div class="item">
        <p class="bookmark-desc item-triple" id="${bookmark.id}">
          ${bookmark.desc}
        </p>
        <button class="bookmark-url btn btn-secondary">
          <a href="${bookmark.url}" id="${bookmark.id}" target="_blank">
            <i class="fas fa-link"></i></a>
        </button>        
      </div>
    </div>
    <hr class="${bookmark.expand === false ? "hidden" : ""}"/>`;
  });
  return `
    <div class="bookmark-wrapper">
        ${bookmarksListElements.join("")}
    </div>
  `;
};

export default {
  mainHTMLGenerator,
  generateBookmarkList,
  generateAddHTML,
};
