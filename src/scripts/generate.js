import $ from 'jquery';
import state from './state';


const mainHTMLGenerator = function(bookmarks) {
  if (state.adding) {
    $('#add-btn').text('Cancel');
    return generateAddHTML();
  } else if (state.edit) {
    $('#add-btn').text('Add a Bookmark');
    return generateEditHTML();
  } else {
    $('#add-btn').text('Add a Bookmark');
    return generateBookmarkList(bookmarks);
  }
};


const generateAddHTML = function() {
  // let errorHTML = '';
  // if(state.error) {
  //   errorHTML = 
  //   `<div class="error item">
  //     <p>*Something's not quite right: ${state.error}</p>
  //   </div>`;} 

  $('main').html(
    `<section id='add-section' class='bookmark-group'>
      <form id="add-bookmark-form" class="form group">
        <h3>Add <i class="fas fa-bookmark"></i></h3>
        <label for="title">
          <input type="text" name="bookmark-title" id="title" value="" placeholder="Bookmark Title" required>
        </label>
        <label for="url">
          <input type="url" name="bookmark-url" id="url" value="" placeholder="https://www.example.com" required>
        </label>
        <label for="description">
          <input type="text" name="bookmark-description" id="description" value="" placeholder="Optional description" >
        </label>
        <label for="rating">Rating:</label>
        <select name="rating" id="rating" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        // ${errorHTML}

        <button id="cancel-btn" class="btn item"><i class="fas fa-times"></i></button>
        <button id="create-btn" class="btn item" type="submit"><i class="fas fa-plus"></i></button>
      </form>
      <hr>
    </section>`
  );
};


const generateEditHTML = function() {
  let errorHTML = '';
  if(state.error) {
    errorHTML = 
    `<div class="error item">
      <p>*Something's not quite right: ${state.error}</p>
    </div>`} 

  $('main').html(
    `<section id="edit-section" class="group bookmark-group">
      <div class="item">
          <h2 class="bookmark-el" id="${state.editBookmark.id}">${state.editBookmark.title}</h2>
          <div class="btn-wrapper">
              <button id="edit-cancel-btn">Cancel</button>
          </div>
      </div>
      <p class="bookmark-el item"><a href="${state.editBookmark.url}" id="${state.editBookmark.id}">${state.editBookmark.url}</a>
      </p>
      <form id="edit-bookmark-form" class="group" >
          <label class="item" for="rating">Rating</label>
          <select class="item" id="rating" name="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
          ${errorHTML}

          <label class="item" for="desc">Description</label>
          <textarea class="item" id="desc" name="desc" placeholder="Optional new description" rows="5" type="text"></textarea>
          <button id="edit-submit-btn" type="submit">Submit Changes</button>
      </form>
    </section>`
  );
};


const generateBookmarkList = function(bookmarks) {
  const bookmarksListElements = bookmarks.map(bookmark => {
    if (bookmark.expand) {
      $('main').html(
        `<section id="expand-section" class="group bookmark-group">
          <div class="item">
              <h2 class="bookmark-title" id="${bookmarks.id}">
                <img src="${bookmarks.url}/favicon.ico" id="favicon"> ${bookmarks.title}
              </h2>
              <div class="btn-wrapper">
                <button id="edit-btn" class="btn edit"><i class="fas fa-edit"></i>
                </button>
                <button id="delete-btn" class="btn delete"><i class="fas fa-trash"></i>
                </button>
                <button id="exp-col-btn" class="btn exp-col"><i class="fas fa-minus"></i>
                </button>
              </div>
          </div>
          <div class="item">
              <p class="bookmark-rating" id="${bookmarks.id}">${generateRatings(bookmarks.rating)}</p>
          </div>
          <div class="item">
              <p class="bookmark-url"><a href="${bookmarks.url}" id="${bookmarks.id}">${bookmarks.url}</a></p>
          </div>
          <div class="item">
              <p class="bookmark-desc" id="${bookmarks.id}">${bookmarks.desc}</p>
          </div>
        </section>`
      );
    } else {
      $('main').html(
        `<section id="bookmark-section" class="group bookmark-group">
          <div class="btn-wrapper item">
              <h2 class="bookmark-el" id="${bookmarks.id}">
                <img src="${bookmarks.url}/favicon.ico" id="favicon">
                ${bookmarks.title} 
                <div id="rating">
                  <input type="radio" name="rating" id="rating-5">
                  <label for="rating-5"></label>
                  <input type="radio" name="rating" id="rating-4">
                  <label for="rating-4"></label>
                  <input type="radio" name="rating" id="rating-3">
                  <label for="rating-3"></label>
                  <input type="radio" name="rating" id="rating-2">
                  <label for="rating-2"></label>
                  <input type="radio" name="rating" id="rating-1">
                  ${generateRatings(bookmarks.rating)}
                </div>
              </h2>
              <div class="btn-wrapper">
                <button id="edit-btn" class="btn"><i class="fas fa-edit"></i></button>
                <button id="delete-btn" class="btn"><i class="fas fa-trash"></i></button>
                <button id="exp-col-btn" class="btn"><i class="fas fa-plus"></i></button>
              </div>
          </div>
        </section>`
      );
    }
  });
  return `
    <div class="bookmark-wrapper">
        ${bookmarksListElements.join('')}
    </div>
  `;
};







// const generateBookmarkListsString = function (shoppingList) {
//   const items = shoppingList.map((item) => generateListElement(item));
//   return items.join('');
// };

// const generateError = function (message) {
//   return `
//       <section class="error-content">
//         <button id="cancel-error">X</button>
//         <p>${message}</p>
//       </section>
//     `;
// };


export default {
  mainHTMLGenerator,
  generateBookmarkList,
  generateAddHTML,
  generateEditHTML
};