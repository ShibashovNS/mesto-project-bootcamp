const overlayPopup = document.querySelectorAll(".popup");

/*функция закрытия попапов*/
function handleButtonClose(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscPopupClose);
}

function handleButtonOpen(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscPopupClose);
}

/*функция закрытия попапа при нажатии на overlay*/
function hadleOverlayClose(event) {
  if (event.target === event.currentTarget) {
    handleButtonClose(event.target);
  }
}

/*закрытие попап по нажатию на Esc*/
function handleEscPopupClose(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    handleButtonClose(popup);
  }
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      handleButtonClose(popup)
    }
    if (evt.target.classList.contains('popup__closed')) {
      handleButtonClose(popup)
    }
  });
})

/*экспорт в index.js*/
export {
  handleButtonClose,
  handleButtonOpen,
};
