import {postNewCard} from "./api-old";

class Api {
    constructor({baseUrl, headers, body}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._body = body;
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', this._headers)
            .then(res => {
                if (res.ok) {
                    return res.json();
            } return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    postNewCard() {
        return fetch(this._baseUrl + '/cards', this._headers)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}




const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: '0499d3b8-89b6-4fc9-a91a-922f11ca9262',
        'Content-Type': 'application/json'
    }
});