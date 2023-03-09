import { userId } from ".."
import { addMyLike, deleteMyCard, deleteMyLike, postNewCard } from "./api"
import { closeByIcon, closeByOverlay } from "./modal"
import { closePopup, getAllCards, openPopup } from "./util.js"

//константы
const addCardPopup = document.querySelector('.popup__mesto')
const mestoForm = document.forms['mesto-form']

//блок картинка
const popupImage = document.querySelector('.popup__image')
const bigImage = popupImage.querySelector('.popup__bigimage')
const bigImageText = popupImage.querySelector('.popup__text')

// раздел для отображения карточек
const elements = document.querySelector('.elements')

//события
closeByIcon(popupImage)
closeByOverlay(popupImage)

mestoForm && mestoForm.addEventListener('submit', addNewCard)

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
  return initialCards.reverse().forEach((card) => {
    elements.prepend(createCard(card))
  })
}

/**
 * Верстка отдельной карточки 
 */
function createCard(data) {
  const cardTemp = document.getElementById('templ-element').cloneNode(true)
  const card = cardTemp.content.querySelector('div')
  const trash = card.querySelector('.element__trash')

  if (userId !== data.owner._id) trash.remove()

  const image = card.querySelector('.element__image')
  const caption = card.querySelector('.element__text')
  const likeBtn = card.querySelector('.element__like')
  const likeCount = card.querySelector('.element__like-count')
  image.src = data.link
  image.alt = data.name
  caption.innerText = data.name
  likeCount.innerText = data.likes.length

  if (isLiked(data)) {
    likeBtn.classList.add('element__like_active')
  } else {
    likeBtn.classList.remove('element__like_active')
  }

  createCardListeners(card, image, data)

  return card
}

/**
 * События для отдельной карточки 
 */

function createCardListeners(card, image, data) {
  const likeBtn = card.querySelector('.element__like')
  const likeCount = card.querySelector('.element__like-count')
  const delBtn = card.querySelector('.element__trash')

  const toggleLike = (event) => {

    if (isLiked(data)) {

      deleteMyLike(data)
        .then((card) => {
          event.target.classList.remove('element__like_active')
          likeCount.innerText = card.likes.length
          data = card
        })
        .catch(e => console.log(e))
    } else {

      addMyLike(data)
        .then((card) => {
          event.target.classList.add('element__like_active')
          likeCount.innerText = card.likes.length
          data = card
        })
        .catch(e => console.log(e))
    }
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
    delBtn && delBtn.removeEventListener('click', deleteCard)

    deleteMyCard(data).then(() => card.remove())

  }

  image.addEventListener('click', openCard)
  likeBtn.addEventListener('click', toggleLike)
  delBtn && delBtn.addEventListener('click', deleteCard)

}
//проверяем, поставил ли автор лайк
function isLiked(data) {
  let liked = false
  data?.likes.forEach(likeAuthor => {
    if (likeAuthor._id === userId) liked = true
  })

  return liked
}

/**
 * Добавление новой карточки
 */

function addNewCard(event) {
  event.preventDefault()
  const name = mestoForm['mesto-name'].value
  const link = mestoForm['mesto-link'].value
  const body = JSON.stringify({ name, link })

  postNewCard(body)
    .then((result) => {
      addCards([result])
      closePopup(addCardPopup)
      event.target.reset()
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));

}
