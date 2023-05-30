/*функция закрытия попапов*/
function handleButtonClose(popup) {
  popup.classList.remove("popup_opened");
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

/*экспорт в index.js*/
export {
  handleButtonClose,
  hadleOverlayClose,
  handleEscPopupClose,
};
