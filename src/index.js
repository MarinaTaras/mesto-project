import './pages/index.css'
// импорт функции валидации
import { enableValidation } from "./components/validate.js"
// импорт функций работы модальных окон
import { closePopup, openPopup } from "./components/modal"
import { avatarForm, editAvatar } from './components/avatar'
import { addCards } from './components/card'
import { closePopups } from './components/util'
import {profileButton, profilePopup, avatar, profileName, avatarPopup, mestoPopup, profileForm,
  profileProfession, userId, editAvatarButton, addCardButton} from "./utils/constants";


import Api from './components/api.js';
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262',
    'Content-Type': 'application/json'
  }
});

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
  const form = event.target
  const button = form.querySelector('.popup__button')
  button.textContent = "Сохранение..."

  api.editUserProfile(name, about)
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
  console.log(api);
  Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ]).then(res => {
    const userInfo = res[0]
    const cards = res[1]
    createUser(userInfo)
    addCards(cards)
  })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));
}

appStart()






