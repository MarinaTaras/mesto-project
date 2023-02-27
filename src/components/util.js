
/**
 * универсальный метод закрытия окна
 */
export function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

/**
 * универсальный метод открытия окна
 */
export function openPopup(popup) {
  popup.classList.add('popup_opened')
}

