
import Popup from "./Popup";


export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._bigImage = this._popup.querySelector('.popup__bigimage')
    this._bigImageText = this._popup.querySelector('.popup__text')
    super._setEventListeners();
  }

  open(event) {
    super.open();
    this._link = event.target.src
    this._caption = event.target.alt

    this._bigImage.src = this._link
    this._bigImageText.textContent = this._caption
    this._bigImage.alt = this._caption
  }
}