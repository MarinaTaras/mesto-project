import { bigImage, bigImageText } from "../utils/constants";
import Popup from "./Popup";


export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
  }

  open(event) {
    super.open();
    this._link = event.target.src
    this._caption = event.target.alt

    bigImage.src = this._link
    bigImageText.textContent = this._caption
    bigImage.alt = this._caption
  }
}