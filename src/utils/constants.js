// POPUPS
// окно формы профиля
export const profilePopup = document.querySelector('.popup__profile')
// окно формы добпвления карточи
export const mestoPopup = document.querySelector('.popup__mesto')
// окно редактирования аватара
export const avatarPopup = document.querySelector('.popup__avatar')

export let userId

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