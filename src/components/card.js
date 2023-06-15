/*создание карточки*/
import { handleButtonOpen } from "../../src/components/modal.js";
import { deliteLike, setLike } from "../../src/components/api.js";
import { deliteCard } from "../../src/components/api.js";

const imagePopup = document.querySelector(".popup__photo");
const imageCaption = document.querySelector(".popup__caption");
const template = document
  .getElementById("photoCardsTeamplate")
  .content.querySelector(".photo__card");
const windowPopupAddImage = document.querySelector(".popup_addImage");

function createCard(src, text, item, userId) {
  const templateClone = template.cloneNode(true);
  const templatePhotoImage = templateClone.querySelector(".photo__image");
  const templateText = templateClone.querySelector(".photo__text");
  const buttonDeliteCard = templateClone.querySelector(".photo__delite");
  const buttonLike = templateClone.querySelector(".photo__like-btn");
  const photoLikeCouter = templateClone.querySelector(".photo__like-count");
  templatePhotoImage.src = src;
  templateText.textContent = text;
  templatePhotoImage.alt = text;

  /*активация лайков*/
  function handleLikeButton(evt, item, userId, buttonLike, photoLikeCouter) {
  const queryMethod = isLiked(item.likes, userId)
    ? deliteLike(item._id)
    : setLike(item._id);
  queryMethod
    .then((res) => {
      item.likes = res.likes;
      updateLike(res.likes, userId, buttonLike, photoLikeCouter);
    })
    .catch((err) => console.log(err));
}

  templatePhotoImage.addEventListener("click", () =>
    handlerOpenPhoto(templateClone, windowPopupAddImage)
  );

  updateLike(item.likes, userId, buttonLike, photoLikeCouter);

  if (item.owner._id !== userId) {
    buttonDeliteCard.remove();
  }

  buttonDeliteCard.addEventListener("click", () =>
    deliteCard(item._id)
      .then(() => {
        handleDeliteCard(templateClone);
      })
      .catch((err) => console.log(err))
  );

  buttonLike.addEventListener("click", (evt) =>
    handleLikeButton(evt, item, userId, buttonLike, photoLikeCouter)
  );
  return templateClone;
}

/*активация лайков
function handleLikeButton(buttonLike) {
  buttonLike.classList.toggle("photo__like-btn_active");
}*/

/*активация лайков
function handleLikeButton(buttonLike) {
  buttonLike.classList.toggle("photo__like-btn_active");
}*/


/*функция с лайкамии*/
function isLiked(likesArray, userId) {
  return likesArray.some((item) => item._id === userId);
}

function updateLike(likesArray, userId, buttonLike, photoLikeCouter
) { buttonLike.classList.toggle("photo__like-btn_active", isLiked(likesArray, userId));
  photoLikeCouter.textContent = likesArray.length;
}

/*удаление карточек*/
function handleDeliteCard(deliteelement) {
  deliteelement.remove();
}

/*кнопка открытия попап image*/
function handlerOpenPhoto(teamplateElement, popup) {
  imagePopup.src = teamplateElement.querySelector(".photo__image").src;
  imageCaption.textContent =
    teamplateElement.querySelector(".photo__text").textContent;
  imagePopup.alt = imageCaption.textContent;
  handleButtonOpen(popup);
}

export { createCard };
