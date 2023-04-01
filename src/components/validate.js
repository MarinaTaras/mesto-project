// валидация форм

export function enableValidation(options) {

  // Функция, которая добавляет класс с ошибкой
  const showInputError = (popupForm, popupItem, errorMessage) => {
    const popupError = popupForm.querySelector(`.${popupItem.id}-error`);
    popupItem.classList.add(options.inputErrorClass);
    popupError.textContent = errorMessage;
    popupError.classList.add(options.errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (popupForm, popupItem) => {
    const popupError = popupForm.querySelector(`.${popupItem.id}-error`);
    popupItem.classList.remove(options.inputErrorClass);
    popupError.classList.remove(options.errorClass);
  };

  // Функция переключения текста ошибок
  const toggleErrorMessage = (popupForm, popupItem) => {
    if (popupItem.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      popupItem.setCustomValidity(popupItem.dataset.errorMessage)
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      popupItem.setCustomValidity("");
    }

    if (!popupItem.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(popupForm, popupItem, popupItem.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(popupForm, popupItem);
    }
  };

  // функция находит все формы и ищет невалидный инпут
  const isFormValid = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((popupItem) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // isFormValid вернёт true

      return !popupItem.validity.valid;
    })
  }

  // функция поиска кнопки, состояние которой надо поменять
  const toggleButtonState = (inputList, submitButton) => {
    if (isFormValid(inputList)) {
      submitButton.disabled = true;
      submitButton.classList.add(options.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      submitButton.disabled = false;
      submitButton.classList.remove(options.inactiveButtonClass);
    }
  }

  // создадим функцию, которая примет параметром элементы формы и добавит полям нужные обработчики
  const setEventListeners = (popupForm) => {
    const inputList = Array.from(popupForm.querySelectorAll(options.inputSelector))
    const submitButton = popupForm.querySelector(options.submitButtonSelector)

    toggleButtonState(inputList, submitButton)

    popupForm.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        toggleButtonState(inputList, submitButton);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });


    inputList.forEach((popupItem) => {
      popupItem.addEventListener('input', () => {
        // Вызовем функцию toggleErrorMessage на каждый ввод символа
        toggleErrorMessage(popupForm, popupItem)
        toggleButtonState(inputList, submitButton)
      })
    })
  }

  // проходим по всем формам
  const setFormValidation = () => {
    const formList = Array.from(document.querySelectorAll(options.formSelector))
    formList.forEach(setEventListeners)
  }

  setFormValidation()
}

