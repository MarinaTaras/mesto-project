<<<<<<< HEAD
const HTTP = 'https://mesto.nomoreparties.co/v1/plus-cohort-20/cards'
const headers = {
  authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262',
  'Content-Type': 'application/json'
}

function getResponseData(res) {
  if (res.ok) return res.json()
  return Promise.reject(res.status)
}

/**
 * Получение списка карточек 
 */
export const getInitialCards = (body) => {
  const options = {
    method: 'GET',
    headers,
    body
  }

  return fetch(HTTP, options)
    .then(res => {
      return getResponseData(res)
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
=======
export default class Api {
    constructor({baseUrl, headers}) {
        this._requestBaseUrl = baseUrl;
        this._requestHeaders = headers;
    }

    _checkResponseData(res) {
        if (res.ok)
            return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(this._requestBaseUrl + '/users/me', { headers: this._requestHeaders })
            .then(res => {
                return this._checkResponseData(res)
            })
    }

    getInitialCards() {
        return fetch(this._requestBaseUrl + '/cards', { headers: this._requestHeaders })
            .then(res => {
                return this._checkResponseData(res)
            })
    }

    addCard(cardName, cardLink) {
        return fetch(this._requestBaseUrl + '/cards', {
                method: 'POST',
                headers: this._requestHeaders,
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
            .then(res => {
                return this._checkResponseData(res)
            })
    }

    deleteCard(cardId) {
        return fetch(this._requestBaseUrl + `/cards/${cardId}`, { headers: this._requestHeaders })
            .then(res => {
                return this._checkResponseData(res)
            })
    }

    addLikeCard(cardId) {
        return fetch(this._requestBaseUrl + `/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._requestHeaders
            })
            .then(res => {
                return this._checkResponseData(res)
            })
    }

    deleteLikeCard(cardId) {
        return fetch(this._requestBaseUrl + `/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._requestHeaders
        })
        .then(res => {
            return this._checkResponseData(res)
        })
    }

    editUserAvatar(avatarUrl) {
        return fetch(this._requestBaseUrl + `/users/me/avatar`, {
                method: 'PATCH',
                headers: this._requestHeaders,
                body: JSON.stringify({
                    avatar: avatarUrl
                })
            })
            .then(res => {
                return this._checkResponseData(res)
            })
    }

    editUserProfile(userName, userDescription) {
        return fetch(this._requestBaseUrl +'/users/me', {
            method: 'PATCH',
            headers: this._requestHeaders,
            body: JSON.stringify({
                name: userName,
                about: userDescription
            })
        })
        .then(res => {
            return this._checkResponseData(res)
        })
    }
>>>>>>> 4a17cad749fd92690863132bdbd16c172c0745ef
}
