// создание пинов
function createPins(pins) {

    const mapPins = document.querySelector('.map__pins');
    const mapPinMain = document.querySelector('.map__pin--main').cloneNode(true);
    const template = document.querySelector('#pin').content.querySelector('.map__pin');

    let mapPinList = document.querySelectorAll('.map__pin');

    if(mapPinList.length > 1) {

        for(let i = 1; i < mapPinList.length; i++) {

            mapPinList[i].remove();
        }
    }

    const mapCard = document.querySelector('.map__card');

    if(mapCard) {

        mapCard.remove();
    }

    pins.forEach( () => {

        mapPins.appendChild(template.cloneNode(true));
    });

    const mapPinImg = document.querySelectorAll('.map__pin img');

    mapPinList = document.querySelectorAll('.map__pin');

    for (let i = 1; i < mapPinList.length; i++) {

        mapPinImg[i].src = pins[i - 1].author.avatar;
        mapPinImg[i].classList.add(`pin__img-${pins[i-1].id}`);

        mapPinList[i].style.left = `${pins[i - 1].location.x}px`;
        mapPinList[i].style.top = `${pins[i - 1].location.y}px`;
    }
}
