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
const windowPopupAatar = document.querySelector(".popup_avatar");
const windowProfileForm = document.forms.register;
const windowNewCardForm = document.forms.newCard;
const windowAvatarForm = document.forms.avatar;

const windowPopupNewCard = document.querySelector(".popup_newCard");
const popupForm = windowPopupNewCard.querySelector(".popup__form");

/*кнопки закрытия модальных окон*/
const overlayPopup = document.querySelectorAll(".popup");
const buttonPopupProfileClose =
  windowPopupProfile.querySelector(".popup__closed");
const buttonPopupNewCard = windowPopupNewCard.querySelector(".popup__closed");
const buttonPopupAddImage = windowPopupAddImage.querySelector(".popup__closed");
const buttonPopupAvatar = windowPopupAatar.querySelector(".popup__closed");

/*перенос значений в инпут*/
const popupContainer = document.querySelector(".popup__container");
const inputItemName = popupContainer.querySelector(".popup__input-item-name");
const inputItemProfession = popupContainer.querySelector(
  ".popup__input-item-profession"
);
const inputItemAvatar = document.querySelector(".popup__input-item-avatar");

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
const buttonAvatar = document.querySelector(".profile__container-avatar");
const buttonProfileSubmit = document.querySelector(".popup__btn");
const containerPopupImage = document.querySelector(".popup__container_image");
const userAvatar = document.querySelector(".profile__user-avatar");
const photoLikes = document.querySelector(".photo__like-count");

let userId;

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
import { getCards } from "../src/components/api.js";
import { setCard } from "../src/components/api.js";
import { getUserInformation } from "../src/components/api.js";
import { setUserInformation } from "../src/components/api.js";
import { setUserAvatar } from "../src/components/api.js";
import {
  createCard,
  handlerOpenPhoto,
  handleLikeButton,
  isLiked,
  updateLike,
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

function setUserInfo(userData) {
  profileUserInformation.textContent = userData.about;
  profileUserName.textContent = userData.name;
  userAvatar.src = userData.avatar;
}

/*функция открытия редактирования профиля*/
function handleButtonEdit(popup) {
  handleButtonOpen(popup);
  inputItemName.value = profileUserName.textContent;
  inputItemProfession.value = profileUserInformation.textContent;
}

/*функция отправки аватара на сервер*/
function handleFormAvatar(event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  setUserAvatar(inputItemAvatar.value)
    .then((res) => {
      setUserInfo(res);
      windowAvatarForm.reset();
      handleButtonClose(windowPopupAatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
}

/*функция попапа регистрации*/
function handleFormProfile(event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  setUserInformation(inputItemProfession.value, inputItemName.value)
    .then((res) => {
      setUserInfo(res);
      handleButtonClose(windowPopupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
}

/*универсальная функция создания карточки*/
function createPhotoCard(src, text, item, userId) {
  const newCard = createCard(src, text, item, userId);
  return newCard;
}

/*Добавление новой карточки*/
function handlePhotoCard(event) {
  event.preventDefault();
  event.submitter.textContent = "Создание...";
  setCard(inputSrcNewCard.value, inputTextNewCard.value)
    .then((res) => {
      const newCard = createPhotoCard(res.link, res.name, res, userId);
      photoGridList.prepend(newCard);
      popupForm.reset();
      handleButtonClose(windowPopupNewCard);
      setEventListeners(windowNewCardForm, settings);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = "Создать";
    });
}

Promise.all([getCards(), getUserInformation()]).then(([allCards, userData]) => {
  userId = userData._id;
  setUserInfo(userData);
  allCards.forEach(function (item) {
    const newCardElement = createPhotoCard(item.link, item.name, item, userId);
    photoGridList.append(newCardElement);
  });
});

/*слушатель блокирует кнопку при сабмите*/
popupForm.addEventListener("submit", handleButtonDisable);

/*слушатили открытия popup*/
buttonEditProfile.addEventListener("click", () =>
  handleButtonEdit(windowPopupProfile)
);
buttonNewCard.addEventListener("click", () =>
  handleButtonOpen(windowPopupNewCard)
);

buttonAvatar.addEventListener("click", () =>
  handleButtonOpen(windowPopupAatar)
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
windowAvatarForm.addEventListener("submit", handleFormAvatar);

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
buttonPopupAvatar.addEventListener("click", () =>
  handleButtonClose(windowPopupAatar)
);

/*слушатель закрытия попап по нажатию на esc*/
document.addEventListener("keydown", handleEscPopupClose);
