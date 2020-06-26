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
  console.log(`getRatings started`);
  let bookmarkRating = "";
  for (let i = 0; i < value; i++) {
    bookmarkRating += '<i class="fas fa-star"></i>';
  }
  console.log(`return bookRating`);
  return bookmarkRating;
};

const generateAddHTML = function () {
  return `<section id='add-section' class='bookmark-group'>
      <form id="add-bookmark-form" class="form group">
        <h3>Add <i class="fas fa-bookmark"></i></h3>
        <div class="error-container"></div>

        <label for="title">
          <input type="text" name="bookmark-title" id="title" value="" placeholder="Bookmark Title" required>
        </label>

        <label for="url">
          <input type="url" name="bookmark-url" id="url" value="" placeholder="https://www.example.com" required>
        </label>

        <label for="description">
          <input type="text" name="bookmark-description" id="description" value="" placeholder="">
        </label>

        <label for="rating">Rating:</label>
        <select name="rating" id="rating" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      

        <button id="cancel-btn" class="btn item"><i class="fas fa-times"></i></button>
        <button id="create-btn" class="btn item" type="submit"><i class="fas fa-plus"></i></button>
      </form>
      <hr>
    </section>`;
};

const generateBookmarkList = function (bookmarks) {
  console.log("bkmk list generate start");
  const bookmarksListElements = bookmarks.map((bookmark) => {
    console.log("not expanded html");
    return `
    <section id="bookmark-section" class="group bookmark-group" data-item-id="${
      bookmark.id
    }">
      <div class="item">
        <h2 class="bookmark-el" id="${bookmark.id}">
          <img src="${bookmark.url}/favicon.ico" id="favicon">
          ${bookmark.title} 
          <div id="rating">
            ${getRatings(bookmark.rating)}
          </div>
        </h2>
      </div>
      <div class="btn-wrapper">
        <button id="delete-btn" class="btn"><i class="fas fa-trash"></i></button>
        <button class="btn exp-col-btn"><i class="fas fa-caret-down ${
          bookmark.expand === false ? "fa-rotate-270" : ""
        }"></i></button>
      </div>
      <div class="expanded-bookmark item ${
        bookmark.expand === false ? "hidden" : ""
      }">
        <p class="bookmark-url">
          <a href="${bookmark.url}" id="${bookmark.id}">
            <i class="fas fa-link"></i></a></p>
        <p class="bookmark-desc" id="${bookmark.id}">
          ${bookmark.desc}</p>
      </div>
    </section>`;
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
