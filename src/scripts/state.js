const bookmarks = [];
let adding = false;
let edit = false;
// let editBookmark;
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
  this.bookmarks = [...bookmarks];
};

const setExpand = function () {
  this.bookmarks = this.bookmarks.map((bookmark) => {
    bookmark.expand = false;
    return bookmark;
  });
};

const editBookmark = function (id, editedBookmark) {
  this.bookmarks = this.bookmarks.map((bookmark) =>
    bookmark.id === id ? Object.assign(bookmark, editedBookmark) : bookmark
  );
};

const toggleProperty = function (object, property) {
  return (object[property] = !object[property]);
};

const deleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(
    (currentBkmk) => currentBkmk.id !== id
  );
};

const setError = function (error) {
  this.error = error;
};

export default {
  bookmarks,
  adding,
  edit,
  editBookmark,
  error,
  filter,
  expand,
  findById,
  addBookmark,
  setExpand,
  toggleProperty,
  deleteBookmark,
  setError,
  loadBookmarks,
};
