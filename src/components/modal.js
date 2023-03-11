
// функции модальных окон
/**
 * универсальный метод открытия окна
 */
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc);
}

/**
 *  Варианты закрытия окна
*/

/**
 * универсальный метод закрытия окна
 */
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc);
}

// закрытие при клике на Esc
export function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}