import { popups } from "../utils/constants";

export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
  }

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
  }

  setEventListeners() {
    popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-icon')) {
          closePopup(popup)
        }
      })
    })
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup)
    }
  }
} 