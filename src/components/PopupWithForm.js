import Popup from "./Popup"

export default class PopupWithForm extends Popup {
  constructor(selector, getSubmitForm) {
    super(selector);
    this._getSubmitForm = getSubmitForm;
    this._popup = document.querySelector(selector)
    this._form = this._popup.querySelector('.popup__form')
    this._items = this._form.querySelectorAll('.popup__item')
    this._btnSubmit = this._form.querySelector('.popup__button')
  }

  _getInputValues() { 
    this._formValues = {}
    this._items.forEach((input) => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues
  }

  setEventListeners() {
    super._setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._btnSubmit.textContent = "Сохранение..."
      this._getSubmitForm(this._getInputValues());
    })
  }

  close() {
    super.close()
    this._form.reset()
  }

}

