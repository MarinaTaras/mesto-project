<<<<<<< HEAD
import { avatarPopup } from ".."
import { editMyAvatar } from "./api"
=======
// This file should be deleted, temporary solution

import { avatarPopup} from "../utils/constants";
>>>>>>> 4a17cad749fd92690863132bdbd16c172c0745ef
import { closePopup } from "./modal"
import Api from './api.js';
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262',
    'Content-Type': 'application/json'
  }
});

const profAvatar = document.querySelector('.profile__avatar')

export const avatarForm = document.forms['avatar-form']

export function editAvatar(event) {
  const form = event.target
  const button = form.querySelector('.popup__button')
  button.textContent = "Сохранение..."

  event.preventDefault()
  const link = avatarForm['avatar-link'].value
    api.editUserAvatar(link)
    .then((result) => {
      profAvatar.src = result.avatar
      closePopup(avatarPopup)
      event.target.reset()
    })
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e))
    .finally(() => {
      button.textContent = "Сохранить"
    })
}

