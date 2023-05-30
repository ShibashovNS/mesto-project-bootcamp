/*создание карточки*/
export default function createCard(src, text) {
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
  buttonLike.addEventListener("click", handleLikeButton);
  return templateClone;
}