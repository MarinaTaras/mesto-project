
// POPUPS
// окно формы профиля
const profilePopup = document.querySelector('.popup__profile')   
// окно добавления карточки  
const addCardPopup = document.querySelector('.popup__mesto')
// картинка в отдельном окне
const popupImage = document.querySelector('.popup__image') 
const popups = [ profilePopup, addCardPopup, popupImage ]

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
const profileButton = document.getElementById('infobutton')
const addCardButton = document.getElementById('addbutton')

// ФОРМЫ 
// редактирование профиля
const profileForm = document.forms['profile']
// добавление места
const mestoForm = document.forms['mesto-form']  

// ПОЛЯ ПРОФИЛЯ
// имя профиля в шапке
const profileName = document.querySelector('.profile__name') 
// профессия профиля в шапке
const profileProfession = document.querySelector('.profile__profession') 

//блок карточки
const elements = document.querySelector('.elements')

//блок картинка
const bigImage = popupImage.querySelector('.popup__bigimage')
const bigImageText = popupImage.querySelector('.popup__text')


// функции

// добавим события

profileButton.addEventListener('click', () => {
  getProfileData()
  openPopup(profilePopup)
})

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup)
})

mestoForm && mestoForm.addEventListener('submit', addNewCard)
profileForm && profileForm.addEventListener('submit', submitProfile)

closeByIcon(popupImage)
closeByOverlay(popupImage)

/** 
 * добавление карточек
 */
addCards(initialCards)

// универсальный метод закрытия 
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

/**
 * универсальный метод открытия 
 */
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

/**
 * Универсальная функция закрытия попапов
 */

const popupButtons = document.querySelectorAll('.p__button')
popupButtons.forEach((pButton) => {
  if (!pButton.dataset.target) {
    console.log('на кнопке отсутствует data атрибут target')
    return
  }

  const popup = document.getElementById(pButton.dataset.target)
  if (!popup) {
    return
  }

  // закрыть по иконке
  closeByIcon(popup)
  
  //закрыть по оверлей
  closeByOverlay(popup)

})



/**
 *  Варианты закрытия окна
 */

// закрытие при клике по оверлей
function closeByOverlay(popup) {
  if (popup.className.includes('overlay')) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup)
      }
    })
  }
}

// закрытие при клике на иконку (крест)
function closeByIcon(popup) {
  const close = popup.querySelector('.close')
  close.addEventListener('click', () => closePopup(popup))
}


/**
 * Подготовка данных для профиля
 */
function getProfileData() {
    profileForm['profile-name'].value = profileName.innerText
    profileForm['profile-profession'].value = profileProfession.innerText
}

/**
 * Подготовка данных для картинки в отдельном окне
 */
function getImageData(target) {
  if (target.className.includes('element__image')) {
      const link = target.src
      const caption = target.alt
      bigImage.src = link
      bigImageText.innerText = caption
      bigImage.alt = caption
    }
}

/**
 * Submit формы профиля
 */
function submitProfile(event) {
  
    event.preventDefault()

    const profileNameValue = profileForm['profile-name']
    const profileProfessionValue = profileForm['profile-profession']

    profileName.innerText = profileNameValue.value
    profileProfession.innerText = profileProfessionValue.value

    closePopup(profilePopup)
  
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
  image.alt = data.name
  caption.innerText = data.name

  createCardListeners(card, image)
  
  closePopup(addCardPopup)

  return card
}

/**
 * События для отдельной карточки 
 */

function createCardListeners(card, image) {
  const likeBtn = card.querySelector('.element__like')
  const delBtn = card.querySelector('.element__trash')

  const toggleLike = (event) => {
    event.target.classList.toggle('element__like_active')
  }

  const openCard = (e) => {
    e.stopPropagation()
    getImageData(e.target)
    openPopup(popupImage)

  }

  const deleteCard = () => {
    // перед удалением карточки очистим слушатели
    image.removeEventListener('click', openCard)
    likeBtn.removeEventListener('click', toggleLike)
    delBtn.removeEventListener('click', deleteCard)

    card.remove()
  }

  image.addEventListener('click', openCard)
  likeBtn.addEventListener('click', toggleLike)
  delBtn.addEventListener('click', deleteCard)
  
}

/**
 * Добавление новой карточки
 */
function addNewCard(event) {
  event.preventDefault()
  const name = mestoForm['mesto-name'].value
  const link = mestoForm['mesto-link'].value
  
  if (name && link) {
    const card = { name, link }
    addCards([card])
  }

  event.target.reset()
}

// добавим display flex чтобы окна не выскакивали перед отрисовкой страницы
popups.forEach((popup) => {
  popup.style.display = 'flex'
})