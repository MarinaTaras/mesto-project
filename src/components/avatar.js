import { avatarPopup } from ".."
import { editMyAvatar } from "./api"
import { closePopup } from "./modal"

const profAvatar = document.querySelector('.profile__avatar')

export const avatarForm = document.forms['avatar-form']

export function editAvatar(event) {
  const form = event.target
  const button = form.querySelector('.popup__button')
  button.textContent = "Сохранение..."

  event.preventDefault()
  const link = avatarForm['avatar-link'].value
  editMyAvatar(link)
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

