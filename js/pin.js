// создание пинов
function createPins() {

    const mapPins = document.querySelector('.map__pins');
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
