import { BASE_URL, TOKEN } from "../utils/constants"

class Api {
    constructor({baseUrl, headers}) {
        this._requestBaseUrl = baseUrl;
        this._requestHeaders = headers;
    }

    _checkResponseData(res) {
        if (res.ok) return res.json()
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
        return fetch(this._requestBaseUrl + `/cards/${cardId}`, { 
          method: 'DELETE',
          headers: this._requestHeaders })
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
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
});

export default api
