import $ from "jquery";
import state from "./state";

const mainHTMLGenerator = function (bookmarks) {
  if (state.adding) {
    $("#add-btn").text("Cancel Bookmark");
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
      <h2 class="hidden">Adding a Bookmark</h2>
      <div class="add-error-container error"></div>
      <form id="add-bookmark-form" class="form group">
        <div class="item flat-icon"><i class="fas fa-bookmark" role="img"></i></div>
        
        <div class="input-group item-triple">
          
          <input type="text" name="bookmark-title" id="title" value="" placeholder="Title" required aria-label="Title of Bookmark">
          <input type="url" name="bookmark-url" id="url" value="" placeholder="https://www.example.com" required aria-label="Bookmark URL">
        </div>

        <div class="input-group item-triple">
          <textarea name="bookmark-description" id="description" placeholder="Optional notes" rows="4" aria-label="Bookmark Notes - Optional"></textarea>
        </div>

        <div class="rating item">
          <input id="rating-5" type="radio" name="rating" value="5" required/>
            <label for="rating-5" tabindex="1">
              <i class="fas fa-star"></i><span class="label-content">5 star rating</span></label>
          <input id="rating-4" type="radio" name="rating" value="4" required/>
            <label for="rating-4" tabindex="2">
              <i class="fas fa-star"></i><span class="label-content">4 star rating</span></label>
          <input id="rating-3" type="radio" name="rating" value="3" required/>
            <label for="rating-3" tabindex="3">
              <i class="fas fa-star"></i><span class="label-content">3 star rating</span></label>
          <input id="rating-2" type="radio" name="rating" value="2" required/>
            <label for="rating-2" tabindex="4">
              <i class="fas fa-star"></i><span class="label-content">2 star rating</span></label>
          <input id="rating-1" type="radio" name="rating" value="1" required/>
            <label for="rating-1" tabindex="5">
              <i class="fas fa-star"></i><span class="label-content">1 star rating</span></label>
        </div>

        <div class="btn-wrapper">
          <button id="create-btn" class="btn btn-secondary item" type="submit" aria-label="Add Bookmark"><i class="fas fa-plus"></i></button>
        </div>
      </form>
    </section>
    <hr />`;
};

const generateBookmarkList = function (bookmarks) {
  const bookmarksListElements = bookmarks.map((bookmark) => {
    return `
    <section id="bookmark-section-${
      bookmark.id
    }" class="group bookmark-group" data-item-id="${
      bookmark.id
    }">
      <div class="delete-error-container error"></div>
      <div class="content-wrapper item">
        <div class="item flat-icon"><i class="fas fa-bookmark"></i></div>  
        <h2 class="bookmark-el item-double">
          <img src="${
            bookmark.url
          }/favicon.ico" class='favicon' alt='website favicon' aria-hidden='true'>
          &nbsp;${bookmark.title}
        </h2> 
        <div id="rating-${bookmark.id}" class="star-rating item-double">
          ${getRatings(bookmark.rating)}
        </div>
      </div>
      <div class="horizontal btn-wrapper item">
        <button class="delete-btn btn btn-secondary" aria-label="Delete Bookmark" value="">
          <i class="fas fa-trash"></i>
        </button>
        <button class="exp-col-btn btn btn-secondary" aria-label="Expand Bookmark" value="">
          <i class="fas fa-caret-down 
          ${bookmark.expand === false ? "fa-rotate-270" : ""}"></i>
        </button>
      </div>
    </section>
    <hr class="${bookmark.expand === true ? "hidden" : ""}"/>
    

    <div class="expanded-bookmark group ${
      bookmark.expand === false ? "hidden" : ""
    }">
      
      <p class="bookmark-desc item" id="bookmark-desc-${bookmark.id}">
          ${bookmark.desc}
      </p>
      <div class="delete-error-container error"></div>
      <div class="btn-wrapper">
        <a href="${bookmark.url}" id="bookmark-btn-${bookmark.id}" class="btn" target="_blank" rel="noreferrer" aria-label="link">
          <i class="fas fa-link"></i>&nbsp;to&nbsp;${bookmark.title}  
        </a>
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
