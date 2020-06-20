const bookmarks = [];
let adding =  false;
let edit = false;
// let editBookmark;
let error = null;
let filter = 0;
let expand = false;

const findById = function (bookmarkID) {
  return this.items.find(currentBkmk => currentBkmk.id === bookmarkID);
};

const addBookmark = function (bkmk) {
  this.bookmarks.push(bkmk);
};

const setExpand = function() {
  this.bookmarks.forEach(bkmk => {
    bkmk['expand'] = false;
    this.bookmarks.push(bkmk);
  });
};

const editBookmark = function (bookmarkID, editedBkmk) {
  const currentBkmk = this.findById(bookmarkID);
  Object.assign(currentBkmk, editedBkmk);
};

const toggleProperty = function (object, property) {
  object[property] = !object[property];
};

const deleteBookmark = function (bookmarkID) {
  this.bookmarks = this.bookmarks.filter(currentBkmk => currentBkmk.id !== bookmarkID);
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
  editBookmark,
  toggleProperty,
  deleteBookmark,
  setError
};