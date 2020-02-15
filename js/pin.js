// создание пинов
function createPins(pins) {

    const mapPins = document.querySelector('.map__pins');
    const template = document.querySelector('#pin').content.querySelector('.map__pin');

    for (let i = 0; i < pins.length; i++) {
        mapPins.appendChild(template.cloneNode(true));
    }

    const mapPinImg = document.querySelectorAll('.map__pin img');
    const mapPinList = document.querySelectorAll('.map__pin');

    for (let i = 1; i < mapPinList.length; i++) {
        mapPinImg[i].src = pins[i - 1].author.avatar;
        mapPinImg[i].classList.add(`pin__img-${i - 1}`);

        mapPinList[i].style.left = `${pins[i - 1].location.x}px`;
        mapPinList[i].style.top = `${pins[i - 1].location.y}px`;
    }
}
