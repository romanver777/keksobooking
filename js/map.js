// управление метками на карте
(function() {

    const map = document.querySelector('.map');
    const mapPins = document.querySelector('.map__pins');
    const mapPinMain = document.querySelector('.map__pin--main');

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

// данные получены
    function successHandler(data) {

        window.ads = data;
        createPins(ads);
    }

// вывод сообщения об ошибке
    function errorHandler(message) {

        alert(message);
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
        const MapPinMainButtonMouseupHandler = () => {

            map.classList.remove('map--faded');
            form.classList.remove('ad-form--disabled');

            enableFormFields();
            window.load(successHandler, errorHandler);

            checkForm();
            addPinsListener();

            mapPinMain.removeEventListener('click', MapPinMainButtonMouseupHandler);
        };

        window.getMainPinLocation();

        mapPinMain.addEventListener('click', MapPinMainButtonMouseupHandler);
    }());

// добавление прослушки на клик по пину
    function addPinsListener() {
        const mapPinsClickHandler = (e) => {
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

        const popupCloseClickHandler = (e) => {
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