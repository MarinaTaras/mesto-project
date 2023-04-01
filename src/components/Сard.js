
export default class Card {
  constructor(cardData, selector, apiCardHandlers, handleCardClick, userId) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._selector = selector;
    this._owner = cardData.owner;

    // привязываем контекст к обработчикам слушателей
    this._handleClickLikeBtn = this._handleClickLikeBtn.bind(this)
    this._handleClickTrashBtn = this._handleClickTrashBtn.bind(this)
    this._handleCardClick = handleCardClick // связываем класс с попапом

    this._apiDeleteLikeCard = apiCardHandlers.apiDeleteLikeCard
    this._apiAddLikeCard = apiCardHandlers.apiAddLikeCard
    this._apiDeleteCard = apiCardHandlers.apiDeleteCard

    this._userId = userId
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector) // template__element находим
      .content // внутренняя часть селектора
      .querySelector('.element') // а вот и наш элемент
      .cloneNode(true); // клонируем его
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._setElementData()
    this._setEventListeners();
    return this._element;
  }

  _setElementData() {  // заполняем данными
    this._trash = this._element.querySelector('.element__trash')
    if (this._userId !== this._owner._id) this._trash.remove()
    this._image = this._element.querySelector('.element__image')
    this._caption = this._element.querySelector('.element__text')
    this._likeBtn = this._element.querySelector('.element__like')
    this._likeCount = this._element.querySelector('.element__like-count')
    this._image.src = this._link
    this._image.alt = this._name
    this._caption.textContent = this._name
    this._likeCount.textContent = this._likes.length
    this._setLikeBtn(this._likeBtn)  
  }

  // добавляем обработчик событий
  _setEventListeners() {
    this._likeBtn.addEventListener('click', this._handleClickLikeBtn);
    this._trash.addEventListener('click', this._handleClickTrashBtn);
    this._image.addEventListener('click', this._handleCardClick);
  }

  // ставим лайки
  _handleClickLikeBtn(event) {
    if (this._isLiked()) {
      this._apiDeleteLikeCard(this._cardId)
        .then((card) => {
          event.target.classList.remove('element__like_active')
          this._likeCount.innerText = card.likes.length
          this._likes = card.likes
        })
        .catch(e => console.log(e))
    } else {
      this._apiAddLikeCard(this._cardId)
        .then((card) => {
          event.target.classList.add('element__like_active')
          this._likeCount.innerText = card.likes.length
          this._likes = card.likes
        })
        .catch(e => console.log(e))
    }
  }
  // удаляем карточку
  _handleClickTrashBtn() {
    this._apiDeleteCard(this._cardId)
      .then(() => this._onDelete())
      .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));

  }

  // удаление карточки из интерфейса
  _onDelete() {
    //this._image.removeEventListener('click', openCard) //добавим потом, когда привяжем попапы
    this._likeBtn.removeEventListener('click', this._handleClickLikeBtn)
    this._trash && this._trash.removeEventListener('click', this._handleClickTrashBtn)
    this._element.remove()
  }

  

  //  _openCard() {
  //     cardData.stopPropagation()
  //     setImageData(cardData.target)
  //     openPopup(popupImage)
  //   }

  _setLikeBtn(likeBtn) {
    if (this._isLiked()) {
      likeBtn.classList.add('element__like_active')
    } else {
      likeBtn.classList.remove('element__like_active')
    }
  }

  _isLiked() {
    let liked = false
    this._likes.forEach(likeAuthor => {
      if (likeAuthor._id === this._userId) liked = true
    })
    return liked
  }
}


