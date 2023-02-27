// валидация форм

export function enableValidation() {

// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupItem, errorMessage) => {
  const popupError = popupForm.querySelector(`.${popupItem.id}-error`);
  popupItem.classList.add('popup__item_error');
  popupError.textContent = errorMessage;
  popupError.classList.add('popup__span_error-active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, popupItem) => {
  const popupError = popupForm.querySelector(`.${popupItem.id}-error`);
  popupItem.classList.remove('popup__item_error');
  popupError.classList.remove('popup__span_error-active');
};

// Функция, которая проверяет валидность поля
const isValid = (popupForm, popupItem) => {
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
const invailidItem = (itemArrows) => {
  // проходим по этому массиву методом some
  return itemArrows.some((popupItem) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !popupItem.validity.valid;
  })
}

// функция поиска кнопки, состояние которой надо поменять
const buttonState = (itemArrows, popupButton) => {
  if (invailidItem(itemArrows)) {
    popupButton.disabled = true;
    popupButton.classList.add('popup__button_inactive');
  } else {
    // иначе сделай кнопку активной
    popupButton.disabled = false;
    popupButton.classList.remove('popup__button_inactive');
  }
}

// создадим функцию, которая примет параметром элементы формы и добавит полям нужные обработчики
const popupLisners = (popupForm) => {
  const itemArrows = Array.from(popupForm.querySelectorAll('.popup__item'))
  const popupButton = popupForm.querySelector('.popup__button')
  
  buttonState(itemArrows, popupButton)

  itemArrows.forEach((popupItem) => {
    popupItem.addEventListener('input', () => {
      // Вызовем функцию isValid на каждый ввод символа
      isValid(popupForm, popupItem)
      buttonState(itemArrows, popupButton)
    })
  })
}

// проходим по всем формам
const formValidation = () => {
  const formArrows = Array.from(document.querySelectorAll('.popup__form'))
  formArrows.forEach((popupForm) => {
    popupLisners(popupForm)
  })
}

formValidation()
}

