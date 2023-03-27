import './pages/index.css'
import Api from './components/Api.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import {BASE_URL, TOKEN, profileName, profileProfession} from './utils/constants';
import Card from './components/Сard';


const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({userName: profileName, userData: profileProfession},
    {getUserInfo: api.getUserInfo.bind(api), setUserInfo: api.editUserProfile.bind(api)});


const info = userInfo.getUserInfo()
    .then((info) => {
      userInfo.setUserInfo(info);
    })
    .catch(() => console.log('Fail get and set userInfo'))


//создание карточки
const elements = document.querySelector('.elements')
const cardLink = 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1530&q=80'
const cardHandlers = {
  apiDeleteLikeCard: api.deleteLikeCard.bind(api),
  apiAddLikeCard: api.addLikeCard.bind(api),
  apiDeleteCard: api.deleteCard.bind(api)
}
const practicumObj = {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  }

const card = new Card(practicumObj, '.template__element', cardHandlers, 456)
elements.prepend(card.generate())


/*
let userId
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
/!**
 * Подготовка данных для профиля
 *!/
function getProfileData() {
  profileForm['profile-name'].value = profileName.innerText
  profileForm['profile-profession'].value = profileProfession.innerText
}
/!**
 * Submit формы профиля
 *!/
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
function appStart() {
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
export { userId }
*/