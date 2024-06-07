//* HTML Elements
var inputName = document.querySelector("#name");
var inputUrl = document.querySelector("#url");
var submitBtn = document.querySelector(".submit");
var tableContent = document.querySelector("#tableContent");
var myModal = document.querySelector(".my-modal");
var closeBtn = document.querySelector("#closeBtn");
var dBtn = document.querySelector(".dBtn");

//* App variable
var bookmarkList = JSON.parse(localStorage.getItem("bookmarks")) || [];
displayAllBookmarks();
var nameRegex = /^[A-Z]?[a-z]{3,}$/;
var urlRegex =
  /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

//* Functions
function addBookmark() {
  if (validate(nameRegex, inputName) && validate(urlRegex, inputUrl)) {
    var bookmark = {
      name: inputName.value,
      url: inputUrl.value,
    };
    bookmarkList.push(bookmark);
    console.log(bookmarkList);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    clearInputs();
    displayBookmark(bookmarkList.length - 1);
    inputName.classList.remove("is-valid");
    inputUrl.classList.remove("is-valid");
  } else {
    displayModal();
  }
}

function clearInputs() {
  inputName.value = "";
  inputUrl.value = "";
}

function displayBookmark(index) {
  var bookmarkHTML = ` <tr class="animate__animated animate__bounceInLeft animate__fast">
  <td>${bookmarkList[index].name}</td>
  <td>${bookmarkList[index].url}</td>
  <td><button type="button" class="btn btn-primary"  onclick="visitUrl(${index})"> <i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
  <td><button type="button" class="btn btn-danger" onclick="deleteBookmark(${index})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
</tr> `;

  tableContent.innerHTML += bookmarkHTML;
}

function displayAllBookmarks() {
  for (var i = 0; i < bookmarkList.length; i++) {
    displayBookmark(i);
  }
}
function visitUrl(index) {
  window.location.href = "http://" + bookmarkList[index].url;
}
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  tableContent.innerHTML = "";
  displayAllBookmarks();
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
function hideModal() {
  myModal.classList.add("d-none");
  inputName.classList.remove("is-invalid");
  inputUrl.classList.remove("is-invalid");
}
function displayModal() {
  myModal.classList.remove("d-none");
}

//* Events
submitBtn.addEventListener("click", addBookmark);
closeBtn.addEventListener("click", hideModal);
myModal.addEventListener("click", function (e) {
  if (e.target == myModal) {
    hideModal();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.code == "Escape") {
    hideModal();
  }
});
