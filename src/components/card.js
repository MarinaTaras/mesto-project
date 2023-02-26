// импорт функций
import {closePopup, mestoForm, addCardPopup} from "../index.js"
/**
 * Подготовка данных для картинки в отдельном окне
 */
export function getImageData(target) {
  if (target.className.includes('element__image')) {
    const link = target.src
    const caption = target.alt
    bigImage.src = link
    bigImageText.innerText = caption
    bigImage.alt = caption
  }
}


/**
 * Верстка карточек из входящего массива
 */
export function addCards(initialCards) {
  const elements = document.querySelector('.elements')
  initialCards.forEach((card) => {
    elements.prepend(createCard(card))
  })
}

/**
 * Верстка отдельной карточки 
 */
export function createCard(data) {
  const cardTemp = document.getElementById('templ-element').cloneNode(true)
  const card = cardTemp.content.querySelector('div')

  const image = card.querySelector('.element__image')
  const caption = card.querySelector('.element__text')

  image.src = data.link
  image.alt = data.name
  caption.innerText = data.name

  createCardListeners(card, image)

  return card
}

/**
 * События для отдельной карточки 
 */

export function createCardListeners(card, image) {
  const likeBtn = card.querySelector('.element__like')
  const delBtn = card.querySelector('.element__trash')

  const toggleLike = (event) => {
    event.target.classList.toggle('element__like_active')
  }

  const openCard = (e) => {
    e.stopPropagation()
    getImageData(e.target)
    openPopup(popupImage)

  }

  const deleteCard = () => {
    // перед удалением карточки очистим слушатели
    image.removeEventListener('click', openCard)
    likeBtn.removeEventListener('click', toggleLike)
    delBtn.removeEventListener('click', deleteCard)

    card.remove()
  }

  image.addEventListener('click', openCard)
  likeBtn.addEventListener('click', toggleLike)
  delBtn.addEventListener('click', deleteCard)

}

/**
 * Добавление новой карточки
 */
export function addNewCard(event) {
  event.preventDefault()
  const name = mestoForm['mesto-name'].value
  const link = mestoForm['mesto-link'].value

  if (name && link) {
    const card = { name, link }
    addCards([card])
  }

  closePopup(addCardPopup)

  event.target.reset()
}
