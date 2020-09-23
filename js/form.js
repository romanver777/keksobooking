// работа с формой
function checkForm() {

    const formEl = document.querySelector('.ad-form');

    const minPriceForFlat = 1000;
    const placeholderForFlat = 1000;
    const capacitySetup = [
        {
            value: 1,
            hiddenEL: [0, 1, 3]
        },
        {
            value: 2,
            hiddenEL: [0, 3]
        },
        {
            value: 3,
            hiddenEL: [3]
        },
        {
            value: 100,
            hiddenEL: [0, 1, 2]
        },
    ];
    const priceSetup = {

        'bungalo': 500,
        'flat': 1000,
        'house': 5000,
        'palace': 10000
    };

    let typeEl = formEl.querySelector('#type');
    let priceEL = formEl.querySelector('#price');
    let roomNumberEL = formEl.querySelector('#room_number');
    let capacityEL = formEl.querySelector('#capacity');

    let capacityOptionlist = capacityEL.querySelectorAll('option');

// установка всех значений для количества мест
    function setDefaultRoomOption() {

        capacityOptionlist.forEach((el) => capacityEL.appendChild(el) );
    }

// установка значения по умолчанию для стоимости жилья
    function setDefaultTypeOption() {

        priceEL.min = minPriceForFlat;
        priceEL.placeholder = placeholderForFlat;
    }

// установка значения по умолчанию для аватарки и фото
	  function setDefaultImgsOption() {

		    document.querySelector('.ad-form__photo').innerHTML = '';
		    document.querySelector('.ad-form__photo').style = '';
		    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
	  }

// очистка формы
	  document.querySelector('.ad-form__reset').addEventListener('click', () => setDefaultImgsOption() );

// изменение количества мест в зависимости от выбора кол-ва комнат
    function changeCapacityOptionField(currentValue) {

        capacitySetup.forEach((el) => {

            if (currentValue == el.value) {

                for (let ind of el.hiddenEL) {

                    capacityEL.removeChild(capacityOptionlist[ind]);
                }
            }
        });
    }

// успешное создание объявления
    function onSuccessHandler() {

        window.createPopupMessage('success');

        formEl.reset();

        window.getMainPinLocation();

        setDefaultTypeOption();
        setDefaultRoomOption();
        setDefaultImgsOption();

        changeCapacityOptionField(roomNumberEL.value);
    }

// ошибка создания объявления
    function onErrorHandler() {

        window.createPopupMessage('error');
    }

// замена стоимости
    typeEl.addEventListener('change', () => {

        switch (typeEl.value) {

            case 'bungalo': {
                priceEL.min = priceSetup['bungalo'];
                priceEL.placeholder = priceSetup['bungalo'];
            }
                break;
            case 'flat': {
                priceEL.min = priceSetup['flat'];
                priceEL.placeholder = priceSetup['flat'];
            }
                break;
            case 'house': {
                priceEL.min = priceSetup['house'];
                priceEL.placeholder = priceSetup['house'];
            }
                break;
            case 'palace': {
                priceEL.min = priceSetup['palace'];
                priceEL.placeholder = priceSetup['palace'];
            }
                break;
        }
        console.log(typeEl.value);
    });

// замена кол-ва мест
    roomNumberEL.addEventListener('change', () => {

        let currentVal = roomNumberEL.value;

        switch (currentVal) {

            case '1': {
                setDefaultRoomOption();
                changeCapacityOptionField(currentVal);
            }
                break;
            case '2': {
                setDefaultRoomOption();
                changeCapacityOptionField(currentVal);
            }
                break;
            case '3': {
                setDefaultRoomOption();
                changeCapacityOptionField(currentVal);
            }
                break;
            case '100': {
                setDefaultRoomOption();
                changeCapacityOptionField(currentVal);
            }
                break;
        }
    });

// отправка формы
    formEl.addEventListener('submit', (e) => {

        e.preventDefault();

        window.save(new FormData(formEl), onSuccessHandler, onErrorHandler);
    });

// добавление картинок
    (function () {

        const types = ['gif', 'jpg', 'jpeg', 'png'];

        const fileInputAvatar = document.querySelector('.ad-form__field input[type= file]');
        const previewAvatar = document.querySelector('.ad-form-header__preview img');

        const fileInputPhoto = document.querySelector('#images');
        const previewPhoto = document.querySelector('.ad-form__photo');

        const imgSize = {
            'width': '50px',
            'height': '50px',
            'margin': '0 10px 10px 0'
        };
        const previewStyle = {
            'display': 'flex',
            'flex-wrap': 'wrap',
            'align-items': 'center',
            'justify-content': 'center',
            'width': 'auto',
            'height': 'auto',
            'padding': '10px 0 0 10px'
        };

        fileInputAvatar.addEventListener('change', () => {

            let file = fileInputAvatar.files[0];
            let fileName = file.name.toLowerCase();

            let match = types.some((el) => {

                return fileName.endsWith(el);
            });

            if (match) {
                let reader = new FileReader();

                reader.addEventListener('load', () => {

                    previewAvatar.src = reader.result;
                });
                reader.readAsDataURL(file);
            }
        });

        fileInputPhoto.addEventListener('change', () => {

            if(fileInputPhoto.files.length) {

                for(let file of fileInputPhoto.files) {

                    let fileName = file.name.toLowerCase();

                    let match = types.some((el) => {

                        return fileName.endsWith(el);
                    });

                    if (match) {
                        let reader = new FileReader();

                        reader.addEventListener('load', () => {

                            for (let key in previewStyle) {

                                previewPhoto.style[key] = previewStyle[key];
                            }
                            let img = new Image();

                            for (let key in imgSize) {

                                img.style[key] = imgSize[key];
                            }

                            img.src = reader.result;

                            previewPhoto.appendChild(img);
                        });
                        reader.readAsDataURL(file);
                    }
                }
            }
        });
    })();

// установка начального значения кол-ва мест
    changeCapacityOptionField(roomNumberEL.value);
}
