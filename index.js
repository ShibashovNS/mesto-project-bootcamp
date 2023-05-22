/*popup элемент*/
const buttonEditProfile = document.querySelector(".profile__editor-btn");
const windowPopupElement = document.querySelector(".popup_profile");
const windowPopupNewCard = document.querySelector(".popup_newCard");
const buttonPopupClose = document.querySelectorAll(".popup__closed");

/*перенос значений в инпут*/
const popupContainer = document.querySelector(".popup__container");
const inputItemName = popupContainer.querySelector(".popup__input-item-name");
const inputItemProfession = popupContainer.querySelector(
  ".popup__input-item-profession"
);

/*текст с профиля*/
const profileUserName = document.querySelector(".profile__user-name");
const profileUserInformation = document.querySelector(
  ".profile__user-information"
);

const template = document
  .getElementById("photoCardsTeamplate")
  .content.querySelector(".photo__card");
const inputTextNewCard = windowPopupNewCard.querySelector(
  ".popup__input-item-name"
);
const inputSrcNewCard = windowPopupNewCard.querySelector(
  ".popup__input-item-profession"
);
const photoGridList = document.querySelector(".photo__grid-list");
const buttonNewCard = document.querySelector(".profile__btn");
const containerPopupImage = document.querySelector(".popup__container_image");
const ImagePopup = document.querySelector(".popup__photo");
const ImageCaption = document.querySelector(".popup__caption");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/*функция закрытия */
function popupButtonClose(event) {
  event.target.closest(".popup").classList.toggle("popup_opened");
}

/*функция открытия редактирования профиля*/
function handleButtonEdit() {
  windowPopupElement.classList.toggle("popup_opened");
  inputItemName.value = profileUserName.textContent;
  inputItemProfession.value = profileUserInformation.textContent;
}

function handleButtonNewCard() {
  windowPopupNewCard.classList.toggle("popup_opened");
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileUserName.textContent = inputItemName.value;
  profileUserInformation.textContent = inputItemProfession.value;
  popupButtonClose(event);
}

/*кнопка открытия попап image*/
function handlerOpenPhoto(teamplateElement) {
  ImagePopup.src = teamplateElement.querySelector(".photo__image").src;
  ImageCaption.textContent =
    teamplateElement.querySelector(".photo__text").textContent;
  containerPopupImage.closest(".popup").classList.toggle("popup_opened");
}

/*активация лайков*/
function handleLikeButton(event) {
  event.target.classList.toggle("photo__like-btn_active");
}

/*удаление карточек*/
function handleDeliteCard(deliteelement) {
  deliteelement.remove();
}

/*копирование карточки*/
function addPhotoCard(src, text) {
  const templateClone = template.cloneNode(true);
  const templatePhotoImage = templateClone.querySelector(".photo__image");
  const templateText = templateClone.querySelector(".photo__text");
  const buttonDeliteCard = templateClone.querySelector(".photo__delite");
  const buttonLike = templateClone.querySelector(".photo__like-btn");

  templatePhotoImage.src = src;
  templateText.textContent = text;

  templatePhotoImage.addEventListener("click", () =>
    handlerOpenPhoto(templateClone)
  );
  buttonDeliteCard.addEventListener("click", () =>
    handleDeliteCard(templateClone)
  );
  buttonLike.addEventListener("click", handleLikeButton);
  return templateClone;
}

/*Добавление новой карточки*/
function handlePhotoCard(event) {
  event.preventDefault();
  const newCard = addPhotoCard(inputSrcNewCard.value, inputTextNewCard.value);
  photoGridList.prepend(newCard);
  inputTextNewCard.value = "";
  inputSrcNewCard.value = "";
  popupButtonClose(event);
}

/*cоздание карточек из заданного массива*/
initialCards.forEach(function (item) {
  const newCardElement = addPhotoCard(item.link, item.name);
  photoGridList.prepend(newCardElement);
});

/*открыть и закрыть popup*/
buttonPopupClose.forEach(function (button) {
  button.addEventListener("click", popupButtonClose);
});

buttonEditProfile.addEventListener("click", handleButtonEdit);
buttonNewCard.addEventListener("click", handleButtonNewCard);
windowPopupNewCard.addEventListener("submit", handlePhotoCard);
windowPopupElement.addEventListener("submit", handleFormSubmit);
