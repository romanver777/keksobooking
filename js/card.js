// создание карточки объекта
function createCard(index) {

    const map = document.querySelector('.map');
    const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    map.appendChild(cardTemplate.cloneNode(true));


    const popupAvatar = document.querySelector('.popup__avatar');
    const popupTitle = document.querySelector('.popup__title');
    const popupTextAddress = document.querySelector('.popup__text--address');
    const popupTextPrice = document.querySelector('.popup__text--price');
    const popupType = document.querySelector('.popup__type');
    const popupTextCapacity = document.querySelector('.popup__text--capacity');
    const popupTextTime = document.querySelector('.popup__text--time');
    const popupFeatures = document.querySelector('.popup__features');
    const popupPhotos = document.querySelector('.popup__photos');


    popupAvatar.src = ads[index].author.avatar;
    popupTitle.innerHTML = ads[index].offer.title;
    popupTextAddress.innerHTML = ads[index].offer.address;
    popupTextPrice.innerHTML = `${ads[index].offer.price}&#x20bd;<span>/ночь</span>`;
    popupType.innerHTML = ads[index].offer.type;
    popupTextCapacity.innerHTML = `${ads[index].offer.rooms} комнаты для ${ads[index].offer.guests} гостей`;
    popupTextTime.innerHTML = `Заезд после ${ads[index].offer.checkIn}, выезд до ${ads[index].offer.checkOut}`;

    (function createFeatures() {
        popupFeatures.innerHTML = '';

        for (const el of ads[index].offer.features) {
            const li = document.createElement('li');

            li.classList.add('popup__feature');
            li.classList.add(`popup__feature--${el}`);

            popupFeatures.appendChild(li);
        }
    }());

    (function createPhotos() {
        popupPhotos.innerHTML = '';

        for (const el of ads[index].offer.photos) {
            const img = document.createElement('img');

            img.setAttribute('class', 'popup__photo');

            img.width = '45';
            img.height = '40';
            img.src = el;

            popupPhotos.appendChild(img);
        }
    }());
}
