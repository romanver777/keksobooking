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

    let typeEl = formEl.querySelector('#type');
    let priceEL = formEl.querySelector('#price');
    let roomNumberEL = formEl.querySelector('#room_number');
    let capacityEL = formEl.querySelector('#capacity');

    let capacityOptionlist = capacityEL.querySelectorAll('option');


    function setDefaultRoomOption() {

        capacityOptionlist.forEach((el) => capacityEL.appendChild(el) );
    }
    function setDefaultTypeOption() {

        priceEL.min = minPriceForFlat;
        priceEL.placeholder = placeholderForFlat;
    }
    function changeCapacityOptionField(currentValue) {

        capacitySetup.forEach((el) => {

            if (currentValue == el.value) {

                for (let ind of el.hiddenEL) {

                    capacityEL.removeChild(capacityOptionlist[ind]);
                }
            }
        });
    }

    function onSuccessHandler(data) {

        console.log('success: ',data);

        formEl.reset();

        window.getMainPinLocation();

        setDefaultTypeOption();
        setDefaultRoomOption();

        changeCapacityOptionField(roomNumberEL.value);
    }
    function onErrorHandler(data) {

        console.log('error: ', data);

    }

    typeEl.addEventListener('change', () => {

        switch (typeEl.value) {

            case 'bungalo': {
                priceEL.min = 500;
                priceEL.placeholder = 500;
            }
                break;
            case 'flat': {
                priceEL.min = 1000;
                priceEL.placeholder = 1000;
            }
                break;
            case 'house': {
                priceEL.min = 5000;
                priceEL.placeholder = 5000;
            }
                break;
            case 'palace': {
                priceEL.min = 10000;
                priceEL.placeholder = 10000;
            }
                break;
        }
        console.log(typeEl.value);
    });
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
    formEl.addEventListener('submit', (e) => {

        e.preventDefault();
        let formData = [...new FormData(formEl)];
        console.log(formData);

        window.save(new FormData(formEl), onSuccessHandler, onErrorHandler);


    });

    changeCapacityOptionField(roomNumberEL.value);
}
