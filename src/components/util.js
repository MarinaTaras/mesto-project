// импорт функций работы модальных окон
import { getInitialCards } from "./api";
import { closeByEsc } from "./modal"
import { addCards } from "./card"


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

/**
 * Запрос всех карточек с обработкой ошибок
 */
export function getAllCards() {
  getInitialCards()
    .then(addCards)
    .catch((e) => console.log('Что-то пошло не так. Код ответа сервера:', e));
}







