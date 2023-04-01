import './pages/index.css'
import Api from './components/Api.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import Card from './components/Сard';
import {
  BASE_URL,
  TOKEN,
  profileName,
  profileProfession,
  profileButton,
  cardSection,
  avatar,
  addCardButton,
  editAvatarButton,
  validatorOptions
} from './utils/constants';
import PopupWithImage from "./components/PopupWithImage";
import PopupWithForm from "./components/PopupWithForm";
import FormValidator from "./components/FormValidator"

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

// функция для создания экземпляра класса валидации
function addValidation(form) {
  new FormValidator(validatorOptions, form).enableValidation()
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
  // Создаём класс формы и передаём коллбэк-обработчик отправки формы с данными
  const popupProfile = new PopupWithForm('.popup__profile', function (userData) {
    api.editUserProfile(userData) // отправляем новые имя и статус на сервер
      .then((data) =>
        userInfo.setUserInfo(data) // обновляем данные у себя на странице
      )
      .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
      .finally(() =>
        popupProfile.close())
  })
  popupProfile.setEventListeners();
  popupProfile.open();
  
  //добавляем валидацию формы
  addValidation(popupProfile._form);
})



// форма редактирования аватара пользователя
editAvatarButton.addEventListener('click', () => {
  // Создаём класс формы и передаём коллбэк-обработчик отправки формы с данными
  const popupAvatar = new PopupWithForm('.popup__avatar', function (userData) {
    api.editUserAvatar(userData) // получаем данные пользователя с новым аватаром
      .then((data) =>
        userInfo.setUserInfo(data) // обновляем данные у себя на странице
      )
      .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
      .finally(() =>
        popupAvatar.close())
  })
  popupAvatar.setEventListeners();
  popupAvatar.open();
  //добавляем валидацию формы
  addValidation(popupAvatar._form);
})

// форма добавления карточки
addCardButton.addEventListener('click', () => {
  // Создаём класс формы и передаём коллбэк-обработчик отправки формы с данными
  const popupAddCard = new PopupWithForm('.popup__mesto', function (cardInput) {
    api.addCard(cardInput) // отправляем имя и картинку карточки на сервер
      .then((serverCardData) => {
        // получили от сервера полные данные карточки (id и тд)
        // теперь создаем карточку на странице
        const card = new Card(serverCardData, '.template__element', cardHandlers,
          () => popupWithImage.open(event), userId)
        const cardElement = card.generate();
        cardSection.append(cardElement);
      })
      .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
      .finally(() =>
        popupAddCard.close())
  })
  popupAddCard.setEventListeners();
  popupAddCard.open();
  //добавляем валидацию формы
  addValidation(popupAddCard._form);
})


