import { userId } from ".."
import { addMyLike, deleteMyCard, deleteMyLike, postNewCard } from "./api"
import { closePopup, openPopup } from "./modal"

//константы
const CardPopup = document.querySelector('.popup__mesto')
const mestoForm = document.forms['mesto-form']

//блок картинка
const popupImage = document.querySelector('.popup__image')
const bigImage = popupImage.querySelector('.popup__bigimage')
const bigImageText = popupImage.querySelector('.popup__text')

// раздел для отображения карточек
const elements = document.querySelector('.elements')

//создание карточек
const cardTemp = document.getElementById('templ-element')

//события

mestoForm && mestoForm.addEventListener('submit', addNewCard)

/**
 * Подготовка данных для картинки в отдельном окне
 */
function setImageData(target) {
  const link = target.src
  const caption = target.alt
  bigImage.src = link
  bigImageText.textContent = caption
  bigImage.alt = caption
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
  const cardClone = cardTemp.cloneNode(true)
  const card = cardClone.content.querySelector('div')
  const trash = card.querySelector('.element__trash')

  if (userId !== data.owner._id) trash.remove()
  
  const image = card.querySelector('.element__image')
  const caption = card.querySelector('.element__text')
  const likeBtn = card.querySelector('.element__like')
  const likeCount = card.querySelector('.element__like-count')
  image.src = data.link
  image.alt = data.name
  caption.textContent = data.name
  likeCount.textContent = data.likes.length

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

  const openCard = (data) => {
    data.stopPropagation()
    setImageData(data.target)
    openPopup(popupImage)
  }

  const deleteCard = () => {

    // перед удалением карточки очистим слушатели
    image.removeEventListener('click', openCard)
    likeBtn.removeEventListener('click', toggleLike)
    delBtn && delBtn.removeEventListener('click', deleteCard)

    deleteMyCard(data)
      .then(() => card.remove())
      .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));

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
  const form = event.target
  const button = form.querySelector('.popup__button')
  button.textContent = "Сохранение..."

  postNewCard(body)
    .then((result) => {
      addCards([result])
      closePopup(CardPopup)
      event.target.reset()
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
    .finally(() => {
      button.textContent = "Сохранить"
    })
}
