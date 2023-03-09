const HTTP = 'https://mesto.nomoreparties.co/v1/plus-cohort-20/cards'
const headers = {
  authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262',
  'Content-Type': 'application/json'
}

/**
 * Получение списка карточек 
 */
export const getInitialCards = () => {

  const options = {
    method: 'GET',
    headers
  }

  return fetch(HTTP, options)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res.status)
    })
}


/**
 * Добавление новой карточки
 */
export const postNewCard = (body) => {

  const options = {
    method: 'POST',
    headers,
    body
  }

  return fetch(HTTP, options)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res.status)
    })
}

/**
 * Удаление карточки
 */
export const deleteMyCard = (data) => {
  const HTTP = `https://mesto.nomoreparties.co/v1/plus-cohort-20/cards/${data._id}`
  const options = {
    method: 'DELETE',
    headers
  }

  return fetch(HTTP, options)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res.status)
    })
}

/**
 * Добавление лайка карточки
 */
export const addMyLike = (data) => {
  const HTTP = `https://mesto.nomoreparties.co/v1/plus-cohort-20/cards/likes/${data._id}`
  const options = {
    method: 'PUT',
    headers
  }

  return fetch(HTTP, options)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res.status)
    })
}

/**
 * Удаление лайка карточки
 */
export const deleteMyLike = (data) => {
  const HTTP = `https://mesto.nomoreparties.co/v1/plus-cohort-20/cards/likes/${data._id}`
  const options = {
    method: 'DELETE',
    headers
  }
  return fetch(HTTP, options)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res.status)
    })
}


/**
 * Редактирование аватарки
 */
export const editMyAvatar = (avatar) => {
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-20/users/me/avatar', options)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res.status)
    })
}

/**
 * Редактирование данных профиля
 */
export const editMyProfile = (body) => {
  const options = {
    method: 'PATCH',
    headers,
    body
  }
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-20/users/me', options)
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res.status)
    })
}

