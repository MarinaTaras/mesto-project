import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
  }

  open() {
    super.open();
    this._link = target.src
    this._caption = target.alt
    bigImage.src = this._link
    bigImageText.textContent = this._caption
    bigImage.alt = this._caption
  }
}