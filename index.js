/*popup элемент*/
const buttonEditProfile = document.querySelector(".profile__editor-btn");
const windowPopupElement = document.querySelector(".popup_profile");
const windowPopupNewCard = document.querySelector(".popup_newCard");
const windowPopupAddImage = document.querySelector(".popup_addImage");

/*кнопки закрытия модальных окон*/
const buttonPopupProfileClose =
  windowPopupElement.querySelector(".popup__closed");
const buttonPopupNewCard = windowPopupNewCard.querySelector(".popup__closed");
const buttonPopupAddImage = windowPopupAddImage.querySelector(".popup__closed");

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
  event.classList.remove("popup_opened");
}

function popupButtonOpen(popup) {
  popup.classList.add("popup_opened");
}

/*функция открытия редактирования профиля*/
function handleButtonEdit(popup) {
  popupButtonOpen(popup);
  inputItemName.value = profileUserName.textContent;
  inputItemProfession.value = profileUserInformation.textContent;
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileUserName.textContent = inputItemName.value;
  profileUserInformation.textContent = inputItemProfession.value;
  popupButtonClose(windowPopupElement);
}

/*кнопка открытия попап image*/
function handlerOpenPhoto(teamplateElement, popup) {
  ImagePopup.src = teamplateElement.querySelector(".photo__image").src;
  ImageCaption.textContent =
    teamplateElement.querySelector(".photo__text").textContent;
  popupButtonOpen(popup);
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
    handlerOpenPhoto(templateClone, windowPopupAddImage)
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
  popupButtonClose(windowPopupNewCard);
}

/*cоздание карточек из заданного массива*/
initialCards.forEach(function (item) {
  const newCardElement = addPhotoCard(item.link, item.name);
  photoGridList.prepend(newCardElement);
});

/*слушатили открытия popup*/
buttonEditProfile.addEventListener("click", () =>
  handleButtonEdit(windowPopupElement)
);
buttonNewCard.addEventListener("click", () =>
  popupButtonOpen(windowPopupNewCard)
);

/*сабмит формы редактирования профиля и добавления карточек*/
windowPopupNewCard.addEventListener("submit", handlePhotoCard);
windowPopupElement.addEventListener("submit", handleFormSubmit);

/*закртытие карточек*/
buttonPopupProfileClose.addEventListener("click", () =>
  popupButtonClose(windowPopupElement)
);

buttonPopupNewCard.addEventListener("click", () =>
  popupButtonClose(windowPopupNewCard)
);

buttonPopupAddImage.addEventListener("click", () =>
  popupButtonClose(windowPopupAddImage)
);
