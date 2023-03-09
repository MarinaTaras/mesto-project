import { avatarPopup } from ".."
import { editMyAvatar } from "./api"
import { closePopup } from "./util"

const headers = {
  authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262',
  'Content-Type': 'application/json'
}


export const avatarForm = document.forms['avatar-form']


export function editAvatar(event) {
const form = event.target
const button = form.querySelector('.popup__button')
button.innerText = "Сохранение..."

  event.preventDefault()
  const link = avatarForm['avatar-link'].value
  const getAvatar = document.querySelector('.profile__avatar')
  editMyAvatar(link)
    .then((result) => {
      getAvatar.src = result.avatar
      closePopup(avatarPopup)
      event.target.reset()
      button.innerText = "Сохранить"
    })
}

