const HTTP = 'https://mesto.nomoreparties.co/v1/plus-cohort-20/cards'
const headers = {
  authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262',
  'Content-Type': 'application/json'
}
/*
function getResponseData(res) {
  if (res.ok) return res.json()
  return Promise.reject(res.status)
}*/

/**
 * Получение списка карточек 
 */
/*export const getInitialCards = (body) => {
  const options = {
    method: 'GET',
    headers,
    body
  }*/

/*  return fetch(HTTP, options)
    .then(res => {
      return getResponseData(res)
    })
}*/


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
      return getResponseData(res)
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
      return getResponseData(res)
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
      return getResponseData(res)
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
      return getResponseData(res)
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
      return getResponseData(res)
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
      return getResponseData(res)
    })
}

//загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  const options = {
    method: 'GET',
    headers
  }
  return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-20/users/me', options)
    .then(res => {
      return getResponseData(res)
    })
}
