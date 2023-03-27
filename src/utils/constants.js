// POPUPS
// окно формы профиля
export const profilePopup = document.querySelector('.popup__profile')
// окно формы добпвления карточи
export const mestoPopup = document.querySelector('.popup__mesto')
// окно редактирования аватара
export const avatarPopup = document.querySelector('.popup__avatar')

// блок картинок
export const cardSection = document.querySelector('.elements')
export const popupImage = document.querySelector('.popup__image')
export const bigImage = popupImage.querySelector('.popup__bigimage')
export const bigImageText = popupImage.querySelector('.popup__text')

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
export const profileButton = document.getElementById('infobutton')
export const addCardButton = document.getElementById('addbutton')
export const editAvatarButton = document.getElementById('editbutton')

// ФОРМЫ
// редактирование профиля
export const profileForm = document.forms['profile']

// ПОЛЯ ПРОФИЛЯ
//аватар
export const avatar = document.querySelector('.profile__avatar')
// имя профиля в шапке
export const profileName = document.querySelector('.profile__name')
// профессия профиля в шапке
export const profileProfession = document.querySelector('.profile__profession')

export const CARD_TEMPLATE_SELECTOR = '.template__element'
export const BASE_URL = 'https://mesto.nomoreparties.co/v1/plus-cohort-20'
export const TOKEN = '0499d3b8-89b6-4fc9-a91a-922f11ca9262'

//валидация
export const validatorOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_error',
  errorClass: 'popup__span_error-active'
}

