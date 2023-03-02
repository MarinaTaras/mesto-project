
// импорт функций работы модальных окон
import { closeByEsc } from "./modal"

/**
 * универсальный метод закрытия окна
 */
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc);
}

/**
 * универсальный метод открытия окна
 */
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc);
}

