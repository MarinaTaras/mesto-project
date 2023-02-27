// импорт функций
import {closePopup} from "../components/util"

// функции модальных окон
/**
 *  Варианты закрытия окна
 */

// закрытие при клике по оверлей
export function closeByOverlay(popup) {
  if (popup.className.includes('overlay')) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup)
      }
    })
  }
}

// закрытие при клике на иконку (крест)
export function closeByIcon(popup) {
  const close = popup.querySelector('.close')
  close.addEventListener('click', () => closePopup(popup))
}

// закрытие при клике на Esc
export function closeByEsc(popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  })
}

