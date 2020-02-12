
const ads = [];

const map = document.querySelector('.map');
const mapPinMain = document.querySelector('.map__pin--main');
const mapPins = document.querySelector('.map__pins');

const form = document.querySelector('.ad-form');

const mainPinWidth = 65;
const mainPinHeight = 87;

const mapWidth = map.offsetWidth;

// создание массива информации
(function () {
  const pinsCount = 8;

  const mainPinWidth = mapPinMain.clientWidth;
  const mainPinHeight = mapPinMain.clientHeight + 22;

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
    'Неуютное бунгало по колено в воде',
  ];
  const address = '';

  const priceMin = 100;
  const priceMax = 1000;

  const type = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];

  const roomsMinCount = 1;
  const roomsMaxCount = 5;

  const guestsMinCount = 1;
  const guestsMaxCount = 3;

  const checkInTimes = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const checkOutTimes = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  const photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  const locationMinX = pinWidth / 2 + (mainPinWidth - pinWidth) / 2;
  const locationMaxX = map.clientWidth - locationMinX;

  const locationMinY = minMapCoord + mainPinHeight - pinHeight;
  const locationMaxY = maxMapCoord - pinHeight;

  const AdsConstruct = function () {
    return {
      author: {
        avatar: `img/avatars/user0${getRandomNumber(1, pinsCount + 1)}.png`,
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
          (a, b) => 0.5 - Math.random(),
        ),
        location: {
          x: getRandomNumber(locationMinX, locationMaxX),
          y: getRandomNumber(locationMinY, locationMaxY),
        },
      },
    };
  };

  for (let i = 0; i < pinsCount; i++) {
    ads.push(new AdsConstruct());
  }
}());

// генерация случайного числа
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// создание пинов
function createPins() {
  const template = document.querySelector('#pin').content.querySelector('.map__pin');

  for (let i = 0; i < ads.length; i++) {
    mapPins.appendChild(template.cloneNode(true));
  }

  const mapPinImg = document.querySelectorAll('.map__pin img');
  const mapPinList = document.querySelectorAll('.map__pin');

  for (let i = 1; i < mapPinList.length; i++) {
    mapPinImg[i].src = ads[i - 1].author.avatar;
    mapPinImg[i].classList.add(`pin__img-${i - 1}`);

    mapPinList[i].style.left = `${ads[i - 1].offer.location.x}px`;
    mapPinList[i].style.top = `${ads[i - 1].offer.location.y}px`;
  }
}

// создание карточки объекта
function createCard(index) {
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

// отключение доступности полей ввода на начальном экране
(function () {
  const fieldSetList = document.querySelector('.ad-form').querySelectorAll('fieldset');

  for (const item of fieldSetList) {
    item.setAttribute('disabled', 'true');
  }
}());

// включение доступности полей ввода
function enableFormFields() {
  const fieldSetList = document.querySelector('.ad-form').querySelectorAll('fieldset');

  for (const item of fieldSetList) {
    item.removeAttribute('disabled');
  }
}

// активация главной страницы
(function () {
  const MapPinMainButtonMouseupHandler = () => {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    enableFormFields();
    createPins();
    addPinsListener();

    mapPinMain.removeEventListener('click', MapPinMainButtonMouseupHandler);
  };

  setLocation(getLocation());

  mapPinMain.addEventListener('click', MapPinMainButtonMouseupHandler);
}());

// получение координат главной кнопки
function getLocation() {
  const { left } = mapPinMain.style;
  const { top } = mapPinMain.style;


  const x = +left.slice(0, -2) + mainPinWidth / 2;
  const y = +top.slice(0, -2) + mainPinHeight;

  return { x, y };
}

// размещение координат главной кнопки в блоке адрес
function setLocation(object) {
  const address = document.querySelector('#address');

  address.value = `${object.x}, ${object.y}`;
}

// добавление прослушки на клик по пину
function addPinsListener() {
  const mapPinsClickHandler = (e) => {
    e.stopPropagation();

    const str = 'pin__img-';
    const { target } = e;

    if (target.classList.length) {
      const list = target.classList.value;

      if (list.indexOf(str) === 0) {
        const mapCard = document.querySelector('.map__card');

        if (mapCard) { mapCard.remove(); }

        createCard(target.className.slice(str.length, target.className.length));
        addCloseCardListener();
      }
    }
  };

  mapPins.addEventListener('click', mapPinsClickHandler);
}

// добавление прослушки на клик по кресту карточки
function addCloseCardListener() {
  const popupClose = document.querySelector('.popup__close');

  const popupCloseClickHandler = (e) => {
    e.stopPropagation();
    e.target.parentNode.remove();

    popupClose.removeEventListener('click', popupCloseClickHandler);
  };

  popupClose.addEventListener('click', popupCloseClickHandler);
}

// перетаскивание главной кнопки пина
const limits = {
  top: 140,
  bottom: 640,
  left: 0,
  right: mapWidth,
};

mapPinMain.addEventListener('mousedown', (event) => {
  event.preventDefault();

  let startCoords = {
    x: event.pageX,
    y: event.pageY,
  };

  const mainPinLeft = mapPinMain.style.left;
  const mainPinTop = mapPinMain.style.top;

  const innerShift = {
    left: startCoords.x - mainPinLeft.slice(0, -2),
    top: startCoords.y - mainPinTop.slice(0, -2),
  };

  const onMousemove = (moveEvent) => {
    moveEvent.preventDefault();

    const addressShiftX = mainPinWidth / 2;
    const addressShiftY = mainPinHeight;
    const address = document.querySelector('#address');

    let addressCoords = {};

    if ((moveEvent.pageX - innerShift.left) > limits.left
            && (moveEvent.pageX - innerShift.left + mainPinWidth) < limits.right
           && moveEvent.pageY > limits.top
           && moveEvent.pageY < limits.bottom) {
      addressCoords = {
        x: startCoords.x + addressShiftX,
        y: startCoords.y + addressShiftY,
      };

      startCoords = {
        x: moveEvent.pageX - innerShift.left,
        y: moveEvent.pageY - innerShift.top,
      };

      mapPinMain.style.left = `${startCoords.x}px`;
      mapPinMain.style.top = `${startCoords.y}px`;

      address.value = `${addressCoords.x}, ${addressCoords.y}`;
    }
  };
  const onMouseup = (upEvent) => {
    upEvent.preventDefault();

    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('mouseup', onMouseup);
  };

  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('mouseup', onMouseup);
});
