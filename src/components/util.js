import { closePopup } from "./modal"

/**
 * Универсальная функция закрытия попапов
 */

const popups = document.querySelectorAll('.popup')

export function closePopups() {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup)
      }
    })
  })
}

