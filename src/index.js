
import './pages/index.css'

import { closePopup, openPopup } from './components/util'

// POPUPS
// окно формы профиля
const profilePopup = document.querySelector('.popup__profile')
// окно формы добпвления карточи 
const mestoPopup = document.querySelector('.popup__mesto')

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
const profileButton = document.getElementById('infobutton')
const addCardButton = document.getElementById('addbutton')

// ФОРМЫ 
// редактирование профиля
const profileForm = document.forms['profile']

// ПОЛЯ ПРОФИЛЯ
// имя профиля в шапке
const profileName = document.querySelector('.profile__name')
// профессия профиля в шапке
const profileProfession = document.querySelector('.profile__profession')

// импорт массива первоначальных карточек
import { initialCards } from "./components/cards"

// импорт функций работы модальных окон
import { closeByOverlay, closeByIcon, closeByEsc } from "./components/modal"

// импорт функций работы с карточками
import { addCards } from "./components/card.js"

// импорт функции валидации
import { enableValidation } from "./components/validate.js"


// функции

// добавим события

profileButton.addEventListener('click', () => {
  getProfileData()
  openPopup(profilePopup)
})

addCardButton.addEventListener('click', () => {
  openPopup(mestoPopup)
})


profileForm && profileForm.addEventListener('submit', submitProfile)

/** 
 * добавление карточек
 */
addCards(initialCards)


/**
 * Универсальная функция закрытия попапов
 */

const popupButtons = document.querySelectorAll('.p__button')
popupButtons.forEach((pButton) => {
  if (!pButton.dataset.target) {
    console.log('на кнопке отсутствует data атрибут target')
    return
  }

  const popup = document.getElementById(pButton.dataset.target)
  if (!popup) {
    return
  }

  // закрыть по иконке
  closeByIcon(popup)

  //закрыть по оверлей
  closeByOverlay(popup)
})

/**
 * Подготовка данных для профиля
 */
function getProfileData() {
  profileForm['profile-name'].value = profileName.innerText
  profileForm['profile-profession'].value = profileProfession.innerText
}

/**
 * Submit формы профиля
 */
function submitProfile(event) {

  event.preventDefault()

  const profileNameValue = profileForm['profile-name']
  const profileProfessionValue = profileForm['profile-profession']

  profileName.innerText = profileNameValue.value
  profileProfession.innerText = profileProfessionValue.value

  closePopup(profilePopup)

}

// // добавим display flex чтобы окна не выскакивали перед отрисовкой страницы
// popups.forEach((popup) => {
//   popup.style.display = 'flex'
// })

// валидация форм

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_error',
  errorClass: 'popup__span_error-active'
});





