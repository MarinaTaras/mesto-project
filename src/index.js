import './pages/index.css'
// POPUPS
// окно формы профиля
const profilePopup = document.querySelector('.popup__profile')
// окно добавления карточки  
export const addCardPopup = document.querySelector('.popup__mesto')
// картинка в отдельном окне
const popupImage = document.querySelector('.popup__image')
const popups = [profilePopup, addCardPopup, popupImage]

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
const profileButton = document.getElementById('infobutton')
const addCardButton = document.getElementById('addbutton')

// ФОРМЫ 
// редактирование профиля
const profileForm = document.forms['profile']
// добавление места
export const mestoForm = document.forms['mesto-form']

// ПОЛЯ ПРОФИЛЯ
// имя профиля в шапке
const profileName = document.querySelector('.profile__name')
// профессия профиля в шапке
const profileProfession = document.querySelector('.profile__profession')


//блок картинка
const bigImage = popupImage.querySelector('.popup__bigimage')
const bigImageText = popupImage.querySelector('.popup__text')

// импорт массива первоначальных карточек
import {initialCards} from "./components/cards.js"

// импорт функций работы модальных окон
import {closeByOverlay, closeByIcon, closeByEsc} from "./components/modal.js"

// импорт функций работы с карточками
import {getImageData, addCards, createCard, createCardListeners, addNewCard} from "./components/card.js"

// импорт функции валидации
import {enableValidation} from "./components/validate.js"

// функции

// добавим события

profileButton.addEventListener('click', () => {
  getProfileData()
  openPopup(profilePopup)
})

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup)
})

mestoForm && mestoForm.addEventListener('submit', addNewCard)
profileForm && profileForm.addEventListener('submit', submitProfile)

closeByIcon(popupImage)
closeByOverlay(popupImage)

/** 
 * добавление карточек
 */
addCards(initialCards)

// универсальный метод закрытия 
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

/**
 * универсальный метод открытия 
 */
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

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

  //закрыть по кнопке Esc
  closeByEsc(popup)

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

// добавим display flex чтобы окна не выскакивали перед отрисовкой страницы
popups.forEach((popup) => {
  popup.style.display = 'flex'
})

// валидация форм
enableValidation()

