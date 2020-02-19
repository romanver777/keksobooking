// управление метками на карте
(function() {

    const map = document.querySelector('.map');
    const mapPins = document.querySelector('.map__pins');
    const mapPinMain = document.querySelector('.map__pin--main');
    const mapFilters = document.querySelector('.map__filters');

    const form = document.querySelector('.ad-form');

    const mainPinWidth = 65;
    const mainPinHeight = 87;

    const mapWidth = map.offsetWidth;

    const limits = {
        top: 140,
        bottom: 640,
        left: 0,
        right: mapWidth,
    };

// отключение доступности полей ввода на начальном экране
    (function () {
        const fieldSetList = document.querySelector('.ad-form').querySelectorAll('fieldset');

        for (const item of fieldSetList) {

            item.disabled = true;
        }
    }());

// включение доступности полей ввода
    function enableFormFields() {
        const fieldSetList = document.querySelector('.ad-form').querySelectorAll('fieldset');

        for (const item of fieldSetList) {

            item.disabled = false;
        }
    }

// создание окна результата
    window.createPopupMessage = (nameElem, message = '') => {

        const notice = document.querySelector('.notice');
        let template = document.querySelector(`#${nameElem}`).content.querySelector(`.${nameElem}`);

        notice.appendChild(template.cloneNode(true));

        if(nameElem == 'error') {

            notice.querySelector('.error__message').innerText = message;
        }
        const elem = document.querySelector(`.${nameElem}`);

        elem.addEventListener('click', () => notice.removeChild(elem));
    };

// данные получены
    function successHandler(data) {

        window.ads = data;

        let count = 0;

        ads.forEach((el) => {

            el.id = count++;
        });

        createPins(ads);
    }

// вывод сообщения об ошибке
    function errorHandler(message) {

        window.createPopupMessage('error', message);
    }

// получение координат главной кнопки и добавление в поле адрес
    window.getMainPinLocation = () => {
        const {left} = mapPinMain.style;
        const {top} = mapPinMain.style;

        const address = document.querySelector('#address');


        const x = +left.slice(0, -2) + mainPinWidth / 2;
        const y = +top.slice(0, -2) + mainPinHeight;

        address.value = `${x}, ${y}`;
    };

// активация главной страницы
    (function () {

        window.getMainPinLocation();

        let MapPinMainButtonMouseupHandler = () => {

            map.classList.remove('map--faded');
            form.classList.remove('ad-form--disabled');

            enableFormFields();
            window.load(successHandler, errorHandler);

            checkForm();
            addPinsListener();

            mapPinMain.removeEventListener('click', MapPinMainButtonMouseupHandler);
        };

        let mapFiltersChangeHandler = () => {

            setTimeout( () => {

                let adsCopy = window.ads;
                let formData = [...new FormData(mapFilters)];
                const str = 'housing-';

                // добавление рейтинга к объектам
                adsCopy.forEach((el) => {

                    el.rate = 0;
                });

                // выборка измененных значений фильтра
                let formDataFiltered = formData.filter((el) => {

                    return el[1] != 'any';
                });

                // поиск соответствия элементам фильтра среди объектов
                formDataFiltered.forEach( (el) => {

                    let key = el[0].slice(str.length, el[0].length);

                    adsCopy.forEach( (elem) => {

                        if(el[0] !== 'features') {

                            if(key == 'price') {

                                switch ( el[1] ) {

                                    case 'low': if( elem.offer[key] < 10000 ) elem.rate += 1;
                                        break;
                                    case 'middle': if( elem.offer[key] >= 10000 && elem.offer[key] < 50000 ) elem.rate += 1;
                                        break;
                                    case 'high': if( elem.offer[key] >= 50000 ) elem.rate += 1;
                                        break;
                                }
                            } else {

                                if ( el[1] == elem.offer[key] ) {

                                    elem.rate += 1;
                                }
                            }
                        } else {

                            if( elem.offer[ el[0] ].indexOf( el[1] ) > -1 ) {

                                elem.rate += 1;
                            }
                        }
                    });
                });
                // фильтрация по рейтингу соответствующему кол-ву выбранных фильров
                adsCopy = adsCopy.filter( (el) => {

                    return el.rate == formDataFiltered.length;
                });

                createPins(adsCopy);
            }, 500);

        };

        mapPinMain.addEventListener('click', MapPinMainButtonMouseupHandler);
        mapFilters.addEventListener('change', mapFiltersChangeHandler);
    }());

// добавление прослушки на клик по пину
    function addPinsListener() {

        let mapPinsClickHandler = (e) => {

            e.stopPropagation();

            const str = 'pin__img-';
            const {target} = e;

            if (target.classList.length) {
                const list = target.classList.value;

                if (list.indexOf(str) === 0) {
                    const mapCard = document.querySelector('.map__card');

                    if (mapCard) {
                        mapCard.remove();
                    }

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

        let popupCloseClickHandler = (e) => {

            e.stopPropagation();
            e.target.parentNode.remove();

            popupClose.removeEventListener('click', popupCloseClickHandler);
        };

        popupClose.addEventListener('click', popupCloseClickHandler);
    }

// перетаскивание главной кнопки пина
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

        let onMousemove = (moveEvent) => {
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
})();