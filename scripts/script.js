const popupImage = document.querySelector('.popup__image')
const profileName = document.querySelector('.profile__name')
const profileProfession = document.querySelector('.profile__profession')
const bigimagePopup = document.getElementById('bigimage')

let profileForm

// блок profile
const infoButton = document.querySelector('#infobutton')

//блок место
const addButton = document.querySelector('#addbutton')

//блок карточки
const elements = document.querySelector('.elements')

//блок картинка
const bigImage = popupImage.querySelector('.popup__bigimage')
const bigImageText = popupImage.querySelector('.popup__text')

// функции

/** 
 * добавление карточек
 */
addCards(initialCards)

/**
 * Универсальная функция открытия попапов
 */

const popupButton = document.querySelectorAll('.p__button')
popupButton.forEach((pButton) => {
  if (!pButton.dataset.target) {
    console.log('на кнопке отсутствует data атрибут target')
    return
  }

  const popup = document.getElementById(pButton.dataset.target)
  if (!popup) {
    return
  }

  pButton.addEventListener('click', (e) => {
    getProfileData(popup)
    openPopup(popup)
  })

  // закрыть попап
  closeByIcon(popup)
  
  //для оверлей
  closeByOverlay(popup)

  //ищем форму
  const profileForm = popup.querySelector('#profileform')
  if (profileForm) {
    addSubmit(profileForm)
  }

  //ищем форму для добавления карточки
  const mestoForm = popup.querySelector('#mestoform')
  if (mestoForm) {
    mestoForm.addEventListener('submit', (event) => addNewCard(event, mestoForm))
  }
})

/**
 *  Варианты закрытия окна
 */

function closePopup(popup) {
  setTimeout(() => {
    popup.classList.remove('popup_opened')
  }, 500)
  popup.classList.remove('popup_op')
}

function closeByOverlay(popup) {
  if (popup.className.includes('overlay')) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup)
      }
    })
  }
}

function closeByIcon(popup) {
  const close = popup.querySelectorAll('.close')
  close.forEach((c) => c.addEventListener('click', () => closePopup(popup)))
}

/**
 * Открытие окна
 */
function openPopup(popup) {
  setTimeout(() => {
    popup.classList.add('popup_op')
  }, 0)
  popup.classList.add('popup_opened')
}

/**
 * Подготовка данных для профиля
 */
function getProfileData(popup) {
  const profileForm = popup.querySelector('#profileform')
    if (profileForm) {
      const profileNameValue = profileForm['profile-name']
      const profileProfessionValue = profileForm['profile-profession']

      profileNameValue.value = profileName.innerText
      profileProfessionValue.value = profileProfession.innerText
    }
}

/**
 * Подготовка данных для картинки в отдельном окне
 */
function getImageData(target) {
  if (target.className.includes('element__image')) {
      const link = target.src
      const caption = target.closest('.element').querySelector('.element__text').innerText
      bigImage.src = link
      bigImageText.innerText = caption
    }
}

/**
 * Submit формы профиля
 */
function addSubmit(form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const profileNameValue = form['profile-name']
    const profileProfessionValue = form['profile-profession']

    profileName.innerText = profileNameValue.value
    profileProfession.innerText = profileProfessionValue.value

    profileNameValue.value = ''
    profileProfessionValue.value = ''
  })
}

/**
 * Верстка карточек из входящего массива
 */
function addCards(initialCards) {
  initialCards.forEach((card) => {
    elements.prepend(createCard(card))
  })
}

/**
 * Верстка отдельной карточки 
 */
function createCard(data) {
  const cardTemp = document.getElementById('templ-element').cloneNode(true)
  const card = cardTemp.content.querySelector('div')

  const image = card.querySelector('.element__image')
  const caption = card.querySelector('.element__text')

  image.src = data.link
  caption.innerText = data.name

  createCardListeners(card, image)

  return card
}

/**
 * События like и delete для отдельной карточки 
 */

function createCardListeners(card, image) {
  const toggleLike = (event) => {
    event.target.classList.toggle('element__like_active')
  }

  const deleteCard = () => {
    card.remove()
  }
  
  image.addEventListener('click', (e) => {
    e.stopPropagation()
    getImageData(e.target)
    openPopup(bigimagePopup)
  })

  card.querySelector('.element__like').addEventListener('click', toggleLike)
  card.querySelector('.element__trash').addEventListener('click', deleteCard)
  closeByIcon(bigimagePopup)
  closeByOverlay(bigimagePopup)
}

/**
 * Добавление новой карточки
 */
function addNewCard(event, mestoForm) {
  event.preventDefault()
  const name = mestoForm['mesto-name'].value
  const link = mestoForm['mesto-link'].value
  if (name && link) {
    const card = { name, link }
    addCards([card])
  }
}
