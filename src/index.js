// index.js
import "./pages/index.css"; // добавьте импорт главного файла стилей

const template = document
  .getElementById("photoCardsTeamplate")
  .content.querySelector(".photo__card");

const windowPopupAddImage = document.querySelector(".popup_addImage");
const imagePopup = document.querySelector(".popup__photo");
const imageCaption = document.querySelector(".popup__caption");
export { template, windowPopupAddImage, imagePopup, imageCaption };

/*элемент*/
const buttonEditProfile = document.querySelector(".profile__editor-btn");
const windowPopupProfile = document.querySelector(".popup_profile");
const windowProfileForm = document.forms.register;
const windowNewCardForm = document.forms.newCard;

const windowPopupNewCard = document.querySelector(".popup_newCard");
/*const windowPopupAddImage = document.querySelector(".popup_addImage"); */
const popupForm = windowPopupNewCard.querySelector(".popup__form");

/*кнопки закрытия модальных окон*/
const overlayPopup = document.querySelectorAll(".popup");
const buttonPopupProfileClose =
  windowPopupProfile.querySelector(".popup__closed");
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

const inputTextNewCard = windowPopupNewCard.querySelector(
  ".popup__input-item-name"
);
const inputSrcNewCard = windowPopupNewCard.querySelector(
  ".popup__input-item-profession"
);
const photoGridList = document.querySelector(".photo__grid-list");
const buttonNewCard = document.querySelector(".profile__btn");
const buttonProfileSubmit = document.querySelector(".popup__btn");
const containerPopupImage = document.querySelector(".popup__container_image");

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

/*импорты из модулей*/
import {
  createCard,
  handlerOpenPhoto,
  handleLikeButton,
  handleDeliteCard,
} from "../src/components/card.js";
import {
  handleButtonClose,
  handleButtonOpen,
  hadleOverlayClose,
  handleEscPopupClose,
} from "../src/components/modal.js";
import {
  validityOptions,
  showError,
  hideError,
  handleFormValidation,
  buttonStatus,
  enableButton,
  disableButton,
  setEventListeners,
  enableValidation,
  handleButtonDisable,
} from "../src/components/validation.js";

/*функция открытия редактирования профиля*/
function handleButtonEdit(popup) {
  handleButtonOpen(popup);
  inputItemName.value = profileUserName.textContent;
  inputItemProfession.value = profileUserInformation.textContent;
}

/*функция попапа регистрации*/
function handleFormProfile(event) {
  event.preventDefault();
  profileUserName.textContent = inputItemName.value;
  profileUserInformation.textContent = inputItemProfession.value;
  handleButtonClose(windowPopupProfile);
}

/*Добавление новой карточки*/
function handlePhotoCard(event) {
  event.preventDefault();
  const newCard = createCard(inputSrcNewCard.value, inputTextNewCard.value);
  photoGridList.prepend(newCard);
  popupForm.reset();
  handleButtonClose(windowPopupNewCard);
  setEventListeners(windowNewCardForm, settings);
}

/*cоздание карточек из заданного массива*/
initialCards.forEach(function (item) {
  const newCardElement = createCard(item.link, item.name);
  photoGridList.prepend(newCardElement);
});


/*слушатель блокирует кнопку при сабмите*/
popupForm.addEventListener('submit', handleButtonDisable);


/*слушатили открытия popup*/
buttonEditProfile.addEventListener("click", () =>
  handleButtonEdit(windowPopupProfile)
);
buttonNewCard.addEventListener("click", () =>
  handleButtonOpen(windowPopupNewCard)
);

/*слушатель закрытия popup при нажатии на overlay*/
overlayPopup.forEach(function (overlay) {
  overlay.addEventListener("mousedown", (event) => {
    hadleOverlayClose(event);
  });
});

/*сабмит формы редактирования профиля и добавления карточек*/
windowPopupNewCard.addEventListener("submit", handlePhotoCard);
windowProfileForm.addEventListener("submit", handleFormProfile);

/*закртытие карточек*/
buttonPopupProfileClose.addEventListener("click", () =>
  handleButtonClose(windowPopupProfile)
);

buttonPopupNewCard.addEventListener("click", () =>
  handleButtonClose(windowPopupNewCard)
);

buttonPopupAddImage.addEventListener("click", () =>
  handleButtonClose(windowPopupAddImage)
);

/*слушатель закрытия попап по нажатию на esc*/
document.addEventListener("keydown", handleEscPopupClose);
