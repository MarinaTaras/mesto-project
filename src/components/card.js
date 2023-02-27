import { closeByEsc, closeByIcon, closeByOverlay } from "./modal.js"
import { closePopup, openPopup } from "./util.js"


const addCardPopup = document.querySelector('.popup__mesto')
const mestoForm = document.forms['mesto-form']

export function createCardForm() {

  openPopup(addCardPopup)

  

  // добавление места
 
}

mestoForm && mestoForm.addEventListener('submit', addNewCard)


//блок картинка
const popupImage = document.querySelector('.popup__image')
const bigImage = popupImage.querySelector('.popup__bigimage')
const bigImageText = popupImage.querySelector('.popup__text')

closeByIcon(popupImage)
closeByOverlay(popupImage)
closeByEsc(popupImage)


/**
 * Подготовка данных для картинки в отдельном окне
 */
function getImageData(target) {
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
function createCard(data) {
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

function createCardListeners(card, image) {
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
