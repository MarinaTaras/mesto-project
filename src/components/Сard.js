export class Card {
  constructor(cardData, selector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._likesCount = cardData.likes.length;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector) // template__element
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {

  }

  _setImageListener() {
    this._element.querySelector('.element__image').addEventListener('click', openCard) //handleCardClick
  }

  _setLikeButtonListener() {

  }

  _setDeleteCardListener() {

  }

}