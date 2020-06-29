const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;
let expand = false;

const findById = function (id) {
  return this.bookmarks.find((bookmark) => bookmark.id === id);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const loadBookmarks = function (bookmarks) {
  this.bookmarks = bookmarks.map((bookmark) => {
    bookmark.expand = false;
    return bookmark;
  });
};

const setExpand = function () {
  this.bookmarks = this.bookmarks.map((bookmark) => {
    bookmark.expand = false;
    return bookmark;
  });
};

const editBookmark = function (id, editedBookmark) {
  this.bookmarks = this.bookmarks.map((bookmark) =>
    bookmark.id === id ? editedBookmark : bookmark
  );
};

const toggleProperty = function (object, property) {
  object[property] = !object[property];
  return object;
};

const deleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(
    (currentBookmark) => currentBookmark.id !== id
  );
};

const setError = function (error) {
  this.error = error;
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  expand,
  findById,
  addBookmark,
  toggleProperty,
  setExpand,
  editBookmark,
  deleteBookmark,
  setError,
  loadBookmarks,
};
