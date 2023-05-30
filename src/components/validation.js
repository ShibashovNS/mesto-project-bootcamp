
/*функция enableValidation ответственная за включение валидации всех форм*/
const validityOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-item",
  buttonSelector: ".popup__btn",
  inputErrorClass: "popup__input-item-invalid",
};

/*функция показывает ошибку*/
function showError(input, settings, errorText) {
  const errorId = `error-${input.id}`;
  const errorMessange = document.getElementById(errorId);
  errorMessange.textContent = errorText;
  input.classList.add(settings.inputErrorClass);
}

/*функция прячет ошибку*/
function hideError(input, settings) {
  const errorId = `error-${input.id}`;
  const errorMessange = document.getElementById(errorId);
  errorMessange.textContent = "";
  input.classList.remove(settings.inputErrorClass);
}

function handleFormValidation(input, settings) {
  if (input.validity.valid) {
    hideError(input, settings);
  } else {
    showError(input, settings, input.validationMessage);
  }
}

/*функция включает и отключает кнопку сабмит события на основание валидности полей*/
function buttonStatus(form, submitButton) {
  if (form.checkValidity()) {
    // метод проверки валидности всей формы
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
}

function enableButton(submitButton) {
  submitButton.disabled = false;
}

function disableButton(submitButton) {
  submitButton.disabled = true;
}

function setEventListeners(form, settings) {
  const buttonSubmit = form.querySelector(settings.buttonSelector);
  const inputList = form.querySelectorAll(settings.inputSelector);
  buttonStatus(form, buttonSubmit);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      handleFormValidation(input, settings);
      buttonStatus(form, buttonSubmit);
    });
  });
}

/*функция перебора и подстановки форм в функци*/
function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

/*передаем настройки переменных функции валидации, чтобы работаь с переменными как с объекстами*/
enableValidation(validityOptions);


export { validityOptions, showError, hideError, handleFormValidation, buttonStatus, enableButton, disableButton, setEventListeners, enableValidation };