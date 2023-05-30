/*создание карточки*/
const template = document
  .getElementById("photoCardsTeamplate")
  .content.querySelector(".photo__card");

const windowPopupAddImage = document.querySelector(".popup_addImage");
const imagePopup = document.querySelector(".popup__photo");
const imageCaption = document.querySelector(".popup__caption");

function createCard(src, text) {
  const templateClone = template.cloneNode(true);
  const templatePhotoImage = templateClone.querySelector(".photo__image");
  const templateText = templateClone.querySelector(".photo__text");
  const buttonDeliteCard = templateClone.querySelector(".photo__delite");
  const buttonLike = templateClone.querySelector(".photo__like-btn");

  templatePhotoImage.src = src;
  templateText.textContent = text;
  templatePhotoImage.alt = text;

  templatePhotoImage.addEventListener("click", () =>
    handlerOpenPhoto(templateClone, windowPopupAddImage)
  );
  buttonDeliteCard.addEventListener("click", () =>
    handleDeliteCard(templateClone)
  );
  buttonLike.addEventListener("click", () => handleLikeButton(event));
  return templateClone;
}

/*кнопка открытия попап image*/
function handlerOpenPhoto(teamplateElement, popup) {
  imagePopup.src = teamplateElement.querySelector(".photo__image").src;
  imageCaption.textContent =
    teamplateElement.querySelector(".photo__text").textContent;
  imagePopup.alt = imageCaption.textContent;
  handleButtonOpen(popup);
}

function handleButtonOpen(popup) {
  popup.classList.add("popup_opened");
}

/*активация лайков*/
function handleLikeButton(event) {
  event.target.classList.toggle("photo__like-btn_active");
}

/*удаление карточек*/
function handleDeliteCard(deliteelement) {
  deliteelement.remove();
}

export {
  template,
  windowPopupAddImage,
  imagePopup,
  imageCaption,
  createCard,
  handlerOpenPhoto,
  handleButtonOpen,
  handleLikeButton,
  handleDeliteCard,
};
