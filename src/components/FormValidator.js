import { validatorOptions } from "../utils/constants";

export class FormValidator {

  constructor(validatorOptions, form) {
    this._formSelector = document.querySelector(validatorOptions.formSelector);
    this._inputSelector = document.querySelector(validatorOptions.inputSelector);
    this._submitButtonSelector = document.querySelector(validatorOptions.submitButtonSelector);
    this._inactiveButtonClass = document.querySelector(validatorOptions.inactiveButtonClass);
    this._inputErrorClass = document.querySelector(validatorOptions.inputErrorClass);
    this._errorClass = document.querySelector(validatorOptions.errorClass);
    this._form = form;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(validatorOptions.formSelector))
    formList.forEach(this._setEventListeners)
  }
  //метод добавляет класс с ошибкой
  _showInputError(formSelector, inputSelector, errorMessage) {
    const popupError = formSelector.querySelector(`.${this._inputSelector.id}-error`);
    this._inputSelector.classList.add(this._inputErrorClass);
    popupError.textContent = errorMessage;
    popupError.classList.add(this._errorClass);
  };

  // метод удаляет класс с ошибкой
  _hideInputError(formSelector, inputSelector) {
    const popupError = formSelector.querySelector(`.${this._inputSelector.id}-error`);
    inputSelector.classList.remove(this._inputErrorClass);
    popupError.classList.remove(this._errorClass);
  };

  // метод переключения текста ошибок
  _toggleErrorMessage(formSelector, inputSelector) {
    if (this._inputSelector.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      this._inputSelector.setCustomValidity(this._inputSelector.dataset.errorMessage)
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      this._inputSelector.setCustomValidity("");
    }

    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(this._formSelector, this._inputSelector, this._inputSelector.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(this._formSelector, this._inputSelector);
    }
  };

  // метод находит все формы и ищет невалидный инпут
  _isFormValid(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputSelector.validity.valid;
    })
  }

  // метод поиска кнопки, состояние которой надо поменять
  _toggleButtonState(inputList, submitButtonSelector) {
    if (_isFormValid(inputList)) {
      submitButtonSelector.disabled = true;
      submitButtonSelector.classList.add(this._inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      submitButtonSelector.disabled = false;
      submitButtonSelector.classList.remove(this._inactiveButtonClass);
    }
  }

  // метод, который примет параметром элементы формы и добавит полям нужные обработчики
  _setEventListeners(formSelector) {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector))
    const submitButton = this._formSelector.querySelector(this._submitButtonSelector)

    _toggleButtonState(inputList, submitButton)

    formSelector.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        toggleButtonState(inputList, submitButton);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });


    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        // Вызовем функцию toggleErrorMessage на каждый ввод символа
        toggleErrorMessage(this._formSelector, this._inputSelector)
        toggleButtonState(inputList, submitButton)
      })
    })
  }
}

