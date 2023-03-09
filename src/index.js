import './pages/index.css'
import { closePopup, getAllCards, openPopup } from './components/util'
// импорт функции валидации
import { enableValidation } from "./components/validate.js"
// импорт функций работы модальных окон
import { closeByOverlay, closeByIcon, closeByEsc } from "./components/modal"
import { avatarForm, editAvatar } from './components/avatar'
import { editMyProfile } from './components/api'

// POPUPS
// окно формы профиля
const profilePopup = document.querySelector('.popup__profile')
// окно формы добпвления карточи 
const mestoPopup = document.querySelector('.popup__mesto')
// окно редактирования аватара
export const avatarPopup = document.querySelector('.popup__avatar')

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
const profileButton = document.getElementById('infobutton')
const addCardButton = document.getElementById('addbutton')
const editAvatarButton = document.getElementById('editbutton')

// ФОРМЫ 
// редактирование профиля
const profileForm = document.forms['profile']

// ПОЛЯ ПРОФИЛЯ
// имя профиля в шапке
const profileName = document.querySelector('.profile__name')
// профессия профиля в шапке
const profileProfession = document.querySelector('.profile__profession')

export let userId

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

/** 
 * добавление карточек
 */

//загрузка карточек с сервера
getAllCards()


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
  closeByIcon(avatarPopup) ///?

  //закрыть по оверлей
  closeByOverlay(popup)
  closeByOverlay(avatarPopup)///?
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

  const name = profileForm['profile-name'].value
  const about = profileForm['profile-profession'].value
  const profileName = document.querySelector('.profile__name')
  const profileProfession = document.querySelector('.profile__profession')
  const body = JSON.stringify({ name, about })

  editMyProfile(body)
    .then((body) => {
      profileName.innerText = body.name
      profileProfession.innerText = body.about
      closePopup(profilePopup)
      event.target.reset()
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));
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


//загрузка информации о пользователе с сервера
fetch('https://mesto.nomoreparties.co/v1/plus-cohort-20/users/me', {
  headers: {
    authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262'
  },
  method: 'GET'
})
  .then(res => res.json())
  .then((result) => {
    const getAvatar = document.querySelector('.profile__avatar')// вынести потом в константы
    const getProfileName = document.querySelector('.profile__name')
    const getProfileAbout = document.querySelector('.profile__profession')

    getAvatar.src = result.avatar
    getProfileName.innerHTML = result.name
    getProfileAbout.innerHTML = result.about
    userId = result._id

    console.log(result); //удалить потом
  })
  .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));

