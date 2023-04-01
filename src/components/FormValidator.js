export default class FormValidator {

  constructor(validatorOptions, form) {
    this._form = form
    this._inputList = this._form.querySelectorAll(validatorOptions.inputSelector);
    this._submitButton = this._form.querySelector(validatorOptions.submitButtonSelector);
    this._inactiveButtonClass = validatorOptions.inactiveButtonClass;
    this._inputErrorClass = validatorOptions.inputErrorClass;
    this._errorClass = validatorOptions.errorClass;
  }

  enableValidation() {
    this._toggleButtonState(this._inputList)
    this._setEventListeners()
  }

  destroy() {
    this.unsubscribe()
  }
  //метод добавляет класс с ошибкой
  _showInputError(input) {

    const errorMessage = input.validationMessage
    const popupError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    popupError.textContent = errorMessage;
    popupError.classList.add(this._errorClass);
  };

  // метод удаляет класс с ошибкой
  _hideInputError(input) {
    const popupError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    popupError.classList.remove(this._errorClass);
  };

  // метод переключения текста ошибок
  _toggleErrorMessage(input) {
    if (input.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      input.setCustomValidity(input.dataset.errorMessage)
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      input.setCustomValidity("");
    }

    if (!input.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(input);
    } else {
      // Если проходит, скроем
      this._hideInputError(input);
    }
  };

  // метод ищет невалидный инпут
  _isFormValid = (inputList) => {
    // проходим по этому массиву методом some
    return Array.from(inputList).some((input) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // isFormValid вернёт true

      return !input.validity.valid;
    })
  }

  // метод поиска кнопки, состояние которой надо поменять
  _toggleButtonState(inputList) {
    if (this._isFormValid(inputList)) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  // метод, который примет параметром элементы формы и добавит полям нужные обработчики
  _setEventListeners() {

    const toggleButtonState = () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы 
      //(вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      // достаточно указать 0 миллисекунд, чтобы после `reset` 
      //уже сработало действие
      setTimeout(() => {
        this._toggleButtonState(this._inputList);
      }, 0); 
    }

    const toggleErrorMessage = (input) => {
        // Вызовем функцию toggleErrorMessage на каждый ввод символа
        this._toggleErrorMessage(input)
        this._toggleButtonState(this._inputList)
    }

    this._form.addEventListener('reset', toggleButtonState);

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => toggleErrorMessage(input))
    })
  }
}

