(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{Y:()=>j,x:()=>S});var t="https://mesto.nomoreparties.co/v1/plus-cohort-20/cards",n={authorization:"0499d3b8-89b6-4fc9-a91a-922f11ca9262","Content-Type":"application/json"},o=function(e){var t="https://mesto.nomoreparties.co/v1/plus-cohort-20/cards/".concat(e._id);return fetch(t,{method:"DELETE",headers:n}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))},r=function(e){var t="https://mesto.nomoreparties.co/v1/plus-cohort-20/cards/likes/".concat(e._id);return fetch(t,{method:"PUT",headers:n}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))},c=function(e){var t="https://mesto.nomoreparties.co/v1/plus-cohort-20/cards/likes/".concat(e._id);return fetch(t,{method:"DELETE",headers:n}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))};function i(e){e.className.includes("overlay")&&e.addEventListener("click",(function(t){t.target===e&&h(e)}))}function a(e){e.querySelector(".close").addEventListener("click",(function(){return h(e)}))}function u(e){"Escape"===e.key&&h(document.querySelector(".popup_opened"))}var s=document.querySelector(".popup__mesto"),l=document.forms["mesto-form"],m=document.querySelector(".popup__image"),d=m.querySelector(".popup__bigimage"),f=m.querySelector(".popup__text"),p=document.querySelector(".elements");function v(e){return e.reverse().forEach((function(e){p.prepend(function(e){var t=document.getElementById("templ-element").cloneNode(!0).content.querySelector("div"),n=t.querySelector(".element__trash");S!==e.owner._id&&n.remove();var i=t.querySelector(".element__image"),a=t.querySelector(".element__text"),u=t.querySelector(".element__like"),s=t.querySelector(".element__like-count");return i.src=e.link,i.alt=e.name,a.innerText=e.name,s.innerText=e.likes.length,_(e)?u.classList.add("element__like_active"):u.classList.remove("element__like_active"),function(e,t,n){var i=e.querySelector(".element__like"),a=e.querySelector(".element__like-count"),u=e.querySelector(".element__trash"),s=function(e){_(n)?c(n).then((function(t){e.target.classList.remove("element__like_active"),a.innerText=t.likes.length,n=t})).catch((function(e){return console.log(e)})):r(n).then((function(t){e.target.classList.add("element__like_active"),a.innerText=t.likes.length,n=t})).catch((function(e){return console.log(e)}))},l=function(e){e.stopPropagation(),function(e){if(e.className.includes("element__image")){var t=e.src,n=e.alt;d.src=t,f.innerText=n,d.alt=n}}(e.target),y(m)};t.addEventListener("click",l),i.addEventListener("click",s),u&&u.addEventListener("click",(function r(){t.removeEventListener("click",l),i.removeEventListener("click",s),u&&u.removeEventListener("click",r),o(n).then((function(){return e.remove()}))}))}(t,i,e),t}(e))}))}function _(e){var t=!1;return null==e||e.likes.forEach((function(e){e._id===S&&(t=!0)})),t}function h(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",u)}function y(e){e.classList.add("popup_opened"),document.addEventListener("keydown",u)}a(m),i(m),l&&l.addEventListener("submit",(function(e){e.preventDefault();var o=l["mesto-name"].value,r=l["mesto-link"].value;(function(e){return fetch(t,{method:"POST",headers:n,body:e}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))})(JSON.stringify({name:o,link:r})).then((function(t){v([t]),h(s),e.target.reset()})).catch((function(e){return console.log("Что-то пошло не так. Код ответа сервера:",e)}))}));var S,E,g,k,q,L=document.forms["avatar-form"],b=document.querySelector(".popup__profile"),T=document.querySelector(".popup__mesto"),j=document.querySelector(".popup__avatar"),x=document.getElementById("infobutton"),C=document.getElementById("addbutton"),P=document.getElementById("editbutton"),B=document.forms.profile,A=document.querySelector(".profile__name"),O=document.querySelector(".profile__profession");x.addEventListener("click",(function(){B["profile-name"].value=A.innerText,B["profile-profession"].value=O.innerText,y(b)})),C.addEventListener("click",(function(){y(T)})),P.addEventListener("click",(function(){y(j)})),B&&B.addEventListener("submit",(function(e){e.preventDefault();var t=B["profile-name"].value,o=B["profile-profession"].value,r=document.querySelector(".profile__name"),c=document.querySelector(".profile__profession");(function(e){return fetch("https://mesto.nomoreparties.co/v1/plus-cohort-20/users/me",{method:"PATCH",headers:n,body:e}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))})(JSON.stringify({name:t,about:o})).then((function(t){r.innerText=t.name,c.innerText=t.about,h(b),e.target.reset()})).catch((function(e){return console.log("Что-то пошло не так. Код ответа сервера:",e)}))})),L&&L.addEventListener("submit",(function(e){var t=e.target.querySelector(".popup__button");t.innerText="Сохранение...",e.preventDefault();var o=L["avatar-link"].value,r=document.querySelector(".profile__avatar");(function(e){var t={method:"PATCH",headers:n,body:JSON.stringify({avatar:e})};return fetch("https://mesto.nomoreparties.co/v1/plus-cohort-20/users/me/avatar",t).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))})(o).then((function(n){r.src=n.avatar,h(j),e.target.reset(),t.innerText="Сохранить"}))})),fetch(t,{method:"GET",headers:n}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).then(v).catch((function(e){return console.log("Что-то пошло не так. Код ответа сервера:",e)})),document.querySelectorAll(".p__button").forEach((function(e){if(e.dataset.target){var t=document.getElementById(e.dataset.target);t&&(a(t),a(j),i(t),i(j))}else console.log("на кнопке отсутствует data атрибут target")})),E={formSelector:".popup__form",inputSelector:".popup__item",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__item_error",errorClass:"popup__span_error-active"},g=function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(E.inputErrorClass),n.classList.remove(E.errorClass)}(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(E.inputErrorClass),o.textContent=n,o.classList.add(E.errorClass)}(e,t,t.validationMessage)},k=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(E.inactiveButtonClass)):(t.disabled=!0,t.classList.add(E.inactiveButtonClass))},q=function(e){var t=Array.from(e.querySelectorAll(E.inputSelector)),n=e.querySelector(E.submitButtonSelector);k(t,n),e.addEventListener("reset",(function(){setTimeout((function(){k(t,n)}),0)})),t.forEach((function(o){o.addEventListener("input",(function(){g(e,o),k(t,n)}))}))},Array.from(document.querySelectorAll(E.formSelector)).forEach(q),fetch("https://mesto.nomoreparties.co/v1/plus-cohort-20/users/me",{headers:{authorization:"0499d3b8-89b6-4fc9-a91a-922f11ca9262"},method:"GET"}).then((function(e){return e.json()})).then((function(e){var t=document.querySelector(".profile__avatar"),n=document.querySelector(".profile__name"),o=document.querySelector(".profile__profession");t.src=e.avatar,n.innerHTML=e.name,o.innerHTML=e.about,S=e._id,console.log(e)})).catch((function(e){return console.log("Что-то пошло не так. Код ответа сервера:",e)}))})();