import './pages/index.css'
import Api from './components/Api.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import Card from './components/Сard';
import { BASE_URL, TOKEN, profileName, profileProfession, profileButton, cardSection, avatar } from './utils/constants';
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
});

// открытие попапа картинки
const popupWithImage = new PopupWithImage('.popup__image')


// Обработчики событий карточки
const cardHandlers = {
  apiDeleteLikeCard: api.deleteLikeCard.bind(api),
  apiAddLikeCard: api.addLikeCard.bind(api),
  apiDeleteCard: api.deleteCard.bind(api)
}

// Обработчики событий профиля
const userProfileHandlers = {
  getUserInfo: api.getUserInfo.bind(api),
  setUserInfo: api.editUserProfile.bind(api),
  updateAvatar: api.editUserAvatar.bind(api)
}

// Загрузка данных пользователя
const userInfo = new UserInfo({ userName: profileName, userData: profileProfession, userAvatar: avatar },
  userProfileHandlers);
let userId = -1;

userInfo.getUserInfo()
  .then((info) => {
    userId = info._id;
    userInfo.setUserInfo(info);
  })
  .catch(() => console.log('Fail get and set userInfo'))

// Загрузка начальных карточек
api.getInitialCards()
  .then((cards) => {
    const cardsList = new Section({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, '.template__element', cardHandlers,
          () => popupWithImage.open(event), userId)

        const cardElement = card.generate();

        cardsList.addItem(cardElement);
      },
    },
      cardSection
    );
    cardsList.renderItems();
  })
  .catch((e) => console.log('Fail get initial cards', e))


// форма редактирования профиля
profileButton.addEventListener('click', () => {
    const popupProfile = new PopupWithForm('.popup__profile', function(userData) {
        api.editUserProfile(userData)
            .then((data) =>
                userInfo.setUserInfo(data)
            )
            .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
            .finally(() =>
                popupProfile.close())
    })
    popupProfile.setEventListeners();
    popupProfile.open();
})


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