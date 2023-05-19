/*popup элемент*/
const buttonEditProfile = document.querySelector(".profile__editor-btn");
const windowPopupElement = document.querySelector(".popup_profile");
const buttonPopupClose = windowPopupElement.querySelector(".popup__closed");

/*перенос значений в инпут*/
const popupContainer = document.querySelector(".popup__container");
const inputItemName = popupContainer.querySelector(".popup__input-item-name");
const inputItemProfession = popupContainer.querySelector(".popup__input-item-profession"
);

/*текст с профиля*/
const profileUserName = document.querySelector(".profile__user-name");
const profileUserInformation = document.querySelector(".profile__user-information");

/*функция закрытия */
function popupButtonClose(event) {
  event.target.closest(".popup").classList.toggle("popup_opened");
}

/*функция открытия редактирования профиля*/
function editProfileButton() {
  windowPopupElement.classList.toggle("popup_opened");
  inputItemName.value = profileUserName.textContent;
  inputItemProfession.value = profileUserInformation.textContent;
}

/*события открытия и закрытия Profile popup*/
buttonPopupClose.addEventListener("click", popupButtonClose);
buttonEditProfile.addEventListener("click", editProfileButton);
