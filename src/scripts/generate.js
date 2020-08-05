import $ from "jquery";
import state from "./state";

const mainHTMLGenerator = function (bookmarks) {
  if (state.adding) {
    $("#add-btn").text("Cancel");
    return generateAddHTML();
  } else {
    $("#add-btn").text("Add a Bookmark");
    return generateBookmarkList(bookmarks);
  }
};

const getRatings = function (value) {
  let bookmarkRating = "";
  for (let i = 0; i < value; i++) {
    bookmarkRating += '<i class="fas fa-star"></i>';
  }
  return bookmarkRating;
};


const generateAddHTML = function () {
  return `<section id='add-section' class='bookmark-group'>
  <div class="error-container"></div>
      <form id="add-bookmark-form" class="form group">
        <div class="item flat-icon"><i class="fas fa-bookmark" role="img"></i></div>
        
        <div class="input-group item-triple">
          <label for="title" title="Bookmark Title">
            <input type="text" name="bookmark-title" id="title" value="" placeholder="Title" required>
          </label>

          <label for="url" title="Bookmark URL">
            <input type="url" name="bookmark-url" id="url" value="" placeholder="https://www.example.com" required>
          </label>
        </div>

        <div class="input-group item-triple">
          <label for="description" title="Bookmark Notes">
            <textarea type="text" name="bookmark-description" id="description" value="" placeholder="Optional notes" rows="4"></textarea>
          </label>
        </div>

        <div class="rating item" required>
          <input id="rating-5" type="radio" name="rating" value="5"/>
            <label for="rating-5">
              <i class="fas fa-star"></i></label>
          <input id="rating-4" type="radio" name="rating" value="4"/>
            <label for="rating-4">
              <i class="fas fa-star"></i></label>
          <input id="rating-3" type="radio" name="rating" value="3"/>
            <label for="rating-3">
              <i class="fas fa-star"></i></label>
          <input id="rating-2" type="radio" name="rating" value="2"/>
            <label for="rating-2">
              <i class="fas fa-star"></i></label>
          <input id="rating-1" type="radio" name="rating" value="1"/>
            <label for="rating-1">
              <i class="fas fa-star"></i></label>
        </div>

        <button id="create-btn" class="btn btn-secondary item" type="submit" aria-label="Add Bookmark"><i class="fas fa-plus"></i></button>
      </form>
    </section>
    <hr />`;
};


const generateBookmarkList = function (bookmarks) {
  const bookmarksListElements = bookmarks.map((bookmark) => {
    return `
    <section id="bookmark-section" class="group bookmark-group" data-item-id="${bookmark.id}">
      <div class="item flat-icon"><i class="fas fa-bookmark"></i></div>  
      <h2 class="bookmark-el item-double" id="${bookmark.id}">
        <img src="${bookmark.url}/favicon.ico" id='favicon' alt='website favicon' aria-hidden='true'>
        ${bookmark.title}
      </h2> 
      <div id="rating" class="item-double">
        ${getRatings(bookmark.rating)}
      </div>
      <div class="vertical btn-wrapper item">
        <button id="delete-btn" class="btn btn-secondary" aria-label="Delete Bookmark" value="">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn exp-col-btn btn-secondary" aria-label="Expand Bookmark" value="">
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
        <button class="bookmark-url btn btn-secondary" aria-label="Bookmark Link">
          <a href="${bookmark.url}" id="${
      bookmark.id
    }" target="_blank" aria-label="link">
            <i class="fas fa-link" role="image"></i></a>
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
