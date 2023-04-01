import './pages/index.css'
// импорт функции валидации
import { enableValidation } from "./components/validate.js"
// импорт функций работы модальных окон
import { closePopup, openPopup } from "./components/modal"
import { avatarForm, editAvatar } from './components/avatar'
import { editMyProfile, getInitialCards, getUserInfo } from './components/api'
import { addCards } from './components/card'
import { closePopups } from './components/util'

// POPUPS
// окно формы профиля
const profilePopup = document.querySelector('.popup__profile')
// окно формы добпвления карточи 
const mestoPopup = document.querySelector('.popup__mesto')
// окно редактирования аватара
export const avatarPopup = document.querySelector('.popup__avatar')

export let userId

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
const profileButton = document.getElementById('infobutton')
const addCardButton = document.getElementById('addbutton')
const editAvatarButton = document.getElementById('editbutton')

// ФОРМЫ 
// редактирование профиля
const profileForm = document.forms['profile']

// ПОЛЯ ПРОФИЛЯ
//аватар
const avatar = document.querySelector('.profile__avatar')
// имя профиля в шапке
const profileName = document.querySelector('.profile__name')
// профессия профиля в шапке
const profileProfession = document.querySelector('.profile__profession')

// функции

// добавим события

profileButton.addEventListener('click', () => {
  getProfileData()
  openPopup(profilePopup)
})

addCardButton.addEventListener('click', () => {
  openPopup(mestoPopup)
})

editAvatarButton.addEventListener('click', () => {
  openPopup(avatarPopup)
})

profileForm && profileForm.addEventListener('submit', submitProfile)

//редактирование аватарки
avatarForm && avatarForm.addEventListener('submit', editAvatar)

closePopups()

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

  const name = profileForm['profile-name'].value
  const about = profileForm['profile-profession'].value
  const body = JSON.stringify({ name, about })
  const form = event.target
  const button = form.querySelector('.popup__button')
  button.textContent = "Сохранение..."

  editMyProfile(body)
    .then((body) => {
      profileName.innerText = body.name
      profileProfession.innerText = body.about
      closePopup(profilePopup)
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
    .finally(() => {
      button.textContent = "Сохранить"
    })
}

// валидация форм

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_error',
  errorClass: 'popup__span_error-active'
});



function createUser(result) {
  avatar.src = result.avatar
  profileName.innerHTML = result.name
  profileProfession.innerHTML = result.about
  userId = result._id
}


// Старт

export function appStart() {
  Promise.all([
    getUserInfo(),
    getInitialCards()
  ]).then(res => {
    const userInfo = res[0]
    const cards = res[1]
    createUser(userInfo)
    addCards(cards)
  })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));
}

appStart()






