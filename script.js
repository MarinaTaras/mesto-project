
const popup = document.querySelector('.popup');

// открытие модального окна редактированния данных пользователя
const infobutton = document.querySelector('#infobutton');

infobutton.addEventListener('click', popupOpen );

//функция открытия попапа редактирования профиля
function popupOpen() {
  popup.classList.add('popup_opened');
}

//редактируем форму профиля
let sub

let profileProfession, profileName
const popupform = document.querySelector('#popupform');
popupform.addEventListener('submit', (event) => {

  event.preventDefault()
  profileName = popupform.elements['profile-name'].value
  profileProfession = popupform.elements['profile-profession'].value

  document.querySelector('.profile__name').innerText = profileName;
  document.querySelector('.profile__profession').innerText = profileProfession;

  popupClose()

  
})

// закрытие модального окна кнопкой close

const closebutton = document.querySelector('#closebutton');

function popupClose(event) {
  
  const close = ['popup__close-icon', 'popup__wrap', 'popup__button' ]
  if (close.includes(event.target.className)) {
    popup.classList.remove('popup_opened')
  }
  
}

closebutton.addEventListener('click', popupClose );

// закрытие модального окна кликом по оверлей

const overley = document.querySelector('#overley');

popup.addEventListener('click', popupClose );

// открытие модального окна карточики картинки

const addbutton = document.querySelector('#addbutton');
const  mesto = document.querySelector('.mesto');


addbutton.addEventListener('click', mestoOpen );

//функция открытия попапа редактирования карточки картинки
function mestoOpen() {
  mesto.classList.add('mesto_opened');
}

// закрытие модального окна карточки картинки кнопкой close

const closemestobutton = document.querySelector('#closemestobutton');



function mestoClose(event) {
  
  const close = ['mesto__close-icon', 'mesto__wrap', 'mesto__button' ]
  if (close.includes(event.target.className)) {
    mesto.classList.remove('mesto_opened')
  }
  
}

closemestobutton.addEventListener('click', mestoClose );

// закрытие модального окна кликом по оверлей

const mestooverley = document.querySelector('#mestooverley');

mesto.addEventListener('click', mestoClose );


//добавление названий и картинок в карточки

const elements = document.querySelector('.elements');


addCards(initialCards);

function addCards(initialCards) {
  initialCards.forEach((card) => {
    elements.prepend(createCard(card))
    })
}

function createCard(data) {

  const card = document.createElement('div')
  card.classList.add('element') 

  card.innerHTML = `
      <div class="element__rectangl">
        <div class="element__mask">
          <img class="element__image" src="${data.link}" alt="${data.name}">
          <button class="element__trash" type="button"></button>
        </div>
        <div class="element__group">
          <h2 class="element__text">${data.name}</h2>
          <button class="element__like" type="button"></button>
        </div>
      </div>`

      createCardListeners(card)

  return card
}
// popup для отдельной карточки
const openimage = document.querySelector('.openimage');
const bigImage = openimage.querySelector('.openimage__bigimage');
const bigImageText = openimage.querySelector('.openimage__text');



//события

function createCardListeners(card) {

  const image = card.querySelector('.element__image')
  const link = image.src
  const caption = card.querySelector('.element__text').innerText
  
  const toggleLike = (event) => { 
    event.target.classList.toggle('element__like_active');
  }

  const deleteCard = (event) => { 
    event.target.offsetParent.remove();
  }

  const imageOpen = (event) => {
    bigImage.src = link
    bigImageText.innerText = caption

    openimage.classList.add('popup_opened')
    
}

  image.addEventListener('click', imageOpen );
  card.querySelector('.element__like').addEventListener('click', toggleLike );
  card.querySelector('.element__trash').addEventListener('click', deleteCard ); 

}


//добавление новой карточки

const mestoForm = document.querySelector('.mesto__form')

mestoForm.addEventListener('submit', (event) => newCard(event))

function newCard(event) {
  event.preventDefault()
  const name = mestoprofile['mesto-name'].value
  const link = mestoprofile['mesto-profession'].value
  const card = {name, link}
  addCards([card])
}

const mestoName = document.querySelector('.mesto__button')
const mestoLink = document.querySelector('.mesto__button')


// закрытие картинки
const closeImage = document.querySelector('.openimage__close')

function openimageClose(event) {
  const close = ['openimage__close-icon', 'openimage', 'openimage__container', 'openimage__close']
  if (close.includes(event.target.className)) {
    openimage.classList.remove('popup_opened')
  }
}
closeImage.addEventListener('click', openimageClose);





function showhide(){
    var div = document.getElementById("#mainpopup");
    if (div.className === "") {
        div.className = "active";
    } else {
        div.className = "";
    }
}