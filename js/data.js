// создание массива информации
(function () {

    window.ads = [];

    const pinsCount = 8;

    const map = document.querySelector('.map');
    const mapPinMain = document.querySelector('.map__pin--main');

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