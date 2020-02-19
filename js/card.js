// создание карточки объекта
function createCard(elemId) {

    const map = document.querySelector('.map');
    const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    const dictionary = {
        "bungalo": "Бунгало",
        "flat": "Квартира",
        "house": "Дом",
        "palace": "Дворец"
    };

    map.appendChild(cardTemplate.cloneNode(true));

    let adsCopy = ads.filter((el) => {

        return el.id == +elemId;
    });

    const popupAvatar = document.querySelector('.popup__avatar');
    const popupTitle = document.querySelector('.popup__title');
    const popupTextAddress = document.querySelector('.popup__text--address');
    const popupTextPrice = document.querySelector('.popup__text--price');
    const popupType = document.querySelector('.popup__type');
    const popupTextCapacity = document.querySelector('.popup__text--capacity');
    const popupTextTime = document.querySelector('.popup__text--time');
    const popupFeatures = document.querySelector('.popup__features');
    const popupPhotos = document.querySelector('.popup__photos');

    popupAvatar.src = adsCopy[0].author.avatar;
    popupTitle.innerHTML = adsCopy[0].offer.title;
    popupTextAddress.innerHTML = adsCopy[0].offer.address;
    popupTextPrice.innerHTML = `${adsCopy[0].offer.price}&#x20bd;<span>/ночь</span>`;
    popupType.innerHTML = dictionary[ adsCopy[0].offer.type ];
    popupTextCapacity.innerHTML = `${adsCopy[0].offer.rooms} комнаты для ${adsCopy[0].offer.guests} гостей`;
    popupTextTime.innerHTML = `Заезд после ${adsCopy[0].offer.checkin}, выезд до ${adsCopy[0].offer.checkout}`;

    (function createFeatures() {

        popupFeatures.innerHTML = '';

        for (let el of adsCopy[0].offer.features) {

            let li = document.createElement('li');

            li.classList.add('popup__feature');
            li.classList.add(`popup__feature--${el}`);

            popupFeatures.appendChild(li);
        }
    }());

    (function createPhotos() {

        popupPhotos.innerHTML = '';

        for (let el of adsCopy[0].offer.photos) {

            let img = document.createElement('img');

            img.setAttribute('class', 'popup__photo');

            img.width = '45';
            img.height = '40';
            img.src = el;

            popupPhotos.appendChild(img);
        }
    }());
}
