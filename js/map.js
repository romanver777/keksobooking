
const ads = [];
const map = document.querySelector('.map');

// создание массива информации
(function createData() {

    const pinsCount = 8;

    const mainPin = document.querySelector('.map__pin--main');

    const mainPinWidth = mainPin.clientWidth;
    const mainPinHeight = mainPin.clientHeight + 22;

    const pinWidth = 50;
    const pinHeight = 70;

    const minMapCoord = 95;
    const maxMapCoord = 630;

    const titleNames = [
        'Большая уютная квартира',
        'Маленькая неуютная квартира',
        'Огромный прекрасный дворец',
        'Маленький ужасный дворец',
        'Красивый гостевой домик',
        'Некрасивый негостеприимный домик',
        'Уютное бунгало далеко от моря',
        'Неуютное бунгало по колено в воде'
    ];
    const address = '';

    const priceMin = 100;
    const priceMax = 1000;

    const type = [
        'palace',
        'flat',
        'house',
        'bungalo'
    ];

    const roomsMinCount = 1;
    const roomsMaxCount = 5;

    const guestsMinCount = 1;
    const guestsMaxCount = 3;

    const checkInTimes = [
        '12:00',
        '13:00',
        '14:00'
    ];
    const checkOutTimes = [
        '12:00',
        '13:00',
        '14:00'
    ];
    const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    const photos = [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];

    const locationMinX = pinWidth / 2 + (mainPinWidth - pinWidth) / 2;
    const locationMaxX = map.clientWidth - locationMinX;

    const locationMinY = minMapCoord + mainPinHeight - pinHeight;
    const locationMaxY = maxMapCoord - pinHeight;

    const AdsConstruct = function () {
        return {
            author: {
                avatar: `img/avatars/user0${getRandomNumber(1, pinsCount + 1)}.png`
            },
            offer: {
                title: titleNames[getRandomNumber(0, titleNames.length + 1)],
                address: 'Фукуока-кэн, Фукуока-си, Ниси-ку, Икиномацубара 6-11-2-1508',
                price: getRandomNumber(priceMin, priceMax) * 10,
                type: type[getRandomNumber(0, type.length)],
                rooms: getRandomNumber(roomsMinCount, roomsMaxCount + 1),
                guests: getRandomNumber(guestsMinCount, guestsMaxCount + 1),
                checkIn: checkInTimes[getRandomNumber(0, checkInTimes.length + 1)],
                checkOut: checkOutTimes[getRandomNumber(0, checkOutTimes.length + 1)],
                features: features.slice(0, getRandomNumber(2, features.length + 1)),
                description: '',
                photos: photos.sort(
                    function (a, b) {
                        return 0.5 - Math.random()
                    }
                ),
                location: {
                    x: getRandomNumber(locationMinX, locationMaxX),
                    y: getRandomNumber(locationMinY, locationMaxY)
                }
            }
        }
    };

    for (let i = 0; i < pinsCount; i++) {

        ads.push(new AdsConstruct);
    }

})();

// генерация случайного числа
function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min) + min);
}

// создание пинов
(function createPins() {

    const template = document.querySelector('#pin').content.querySelector('.map__pin');
    const mapPins = document.querySelector('.map__pins');

    map.classList.remove('map--faded');

    for (let i = 0; i < ads.length; i++) {

        mapPins.appendChild(template.cloneNode(true));
    }

    const mapPinImg = document.querySelectorAll('.map__pin img');
    const mapPinList = document.querySelectorAll('.map__pin');

    for (let i = 1; i < mapPinList.length; i++) {

        mapPinImg[i].src = ads[i - 1].author.avatar;
        mapPinList[i].style = `left: ${ads[i - 1].offer.location.x}px; top: ${ads[i - 1].offer.location.y}px`;
    }
})();

// создание карточки объекта
(function createCard() {

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
    const popupDescription = document.querySelector('.popup__description');
    const popupPhotos = document.querySelector('.popup__photos');


    popupAvatar.src = ads[0].author.avatar;
    popupTitle.innerHTML = ads[0].offer.title;
    popupTextAddress.innerHTML = ads[0].offer.address;
    popupTextPrice.innerHTML = `${ads[0].offer.price}&#x20bd;<span>/ночь</span>`;
    popupType.innerHTML = ads[0].offer.type;
    popupTextCapacity.innerHTML = `${ads[0].offer.rooms} комнаты для ${ads[0].offer.guests} гостей`;
    popupTextTime.innerHTML = `Заезд после ${ads[0].offer.checkIn}, выезд до ${ads[0].offer.checkOut}`;

    (function createFeatures() {

        popupFeatures.innerHTML = '';

        for (let el of ads[0].offer.features) {

            let li = document.createElement('li');

            li.classList.add('popup__feature');
            li.classList.add(`popup__feature--${el}`);

            popupFeatures.appendChild(li);
        }
    })();

    (function createPhotos() {

        popupPhotos.innerHTML = '';

        for (let el of ads[0].offer.photos) {

            let img = document.createElement('img');

            img.setAttribute('class', 'popup__photo');

            img.width = '45';
            img.height = '40';
            img.src = el;

            popupPhotos.appendChild(img);
        }
    })();
})();