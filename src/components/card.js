/*создание карточки*/
import {
  template,
  windowPopupAddImage,
  imagePopup,
  imageCaption,
} from "../../src/index.js";
import { handleButtonOpen } from "../../src/components/modal.js";
import { deliteLike, setLike } from "../../src/components/api.js";
import { deliteCard } from "../../src/components/api.js";

function createCard(src, text, item, userId) {
  const templateClone = template.cloneNode(true);
  const templatePhotoImage = templateClone.querySelector(".photo__image");
  const templateText = templateClone.querySelector(".photo__text");
  const buttonDeliteCard = templateClone.querySelector(".photo__delite");
  const buttonLike = templateClone.querySelector(".photo__like-btn");
  const photoLikeCouter = templateClone.querySelector(".photo__like-count");
  let cardlikes = item.likes;

  templatePhotoImage.src = src;
  templateText.textContent = text;
  templatePhotoImage.alt = text;

  templatePhotoImage.addEventListener("click", () =>
    handlerOpenPhoto(templateClone, windowPopupAddImage)
  );

  updateLike(item.likes, userId, cardlikes, buttonLike, photoLikeCouter);

  if (item.owner._id !== userId) {
    buttonDeliteCard.remove();
  }

  buttonDeliteCard.addEventListener("click", () =>
    deliteCard(item._id).then(() => {
      handleDeliteCard(templateClone);
    })
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

/*активация лайков*/
function handleLikeButton(evt, item, userId, buttonLike, photoLikeCouter) {
  let cardlikes = item.likes;
  console.log(cardlikes);
  console.log(isLiked(cardlikes, userId));

  const queryMethod = buttonLike.classList.contains("photo__like-btn_active")
    ? deliteLike(item._id)
    : setLike(item._id);
  console.log(queryMethod);
  queryMethod
    .then((res) => {
      console.log(res.likes);
      updateLike(res.likes, userId, cardlikes, buttonLike, photoLikeCouter);
      console.log(res.likes);
      console.log(userId);
      console.log(cardlikes);
      console.log(buttonLike);
      console.log(photoLikeCouter);
    })
    .catch((err) => console.log(err));
}

/*функция с лайкамии*/
function isLiked(likesArray, userId) {
  return likesArray.some((item) => item._id === userId);
}

function updateLike(
  likesArray,
  userId,
  cardlikes,
  buttonLike,
  photoLikeCouter
) {
  /* cardlikes = likesArray;
  console.log(cardlikes); */
  /*console.log(cardlikes)*/

  buttonLike.classList.toggle(
    "photo__like-btn_active",
    isLiked(likesArray, userId)
  );

  photoLikeCouter.textContent = likesArray.length;
  /*console.log(likesArray)
  console.log(userId)
  console.log(buttonLike)
  console.log(photoLikeCouter)
  console.log(buttonLike.classList.toggle("photo__like-btn_active", isLiked(likesArray, userId)))
  console.log(photoLikeCouter.textContent = likesArray.length)
  console.log(isLiked(likesArray, userId)) */
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

export { createCard, handlerOpenPhoto, handleLikeButton, handleDeliteCard };
