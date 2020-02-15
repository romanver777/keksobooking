// получение и отправка данных на сервер
(function () {

    const url     = 'https://js.dump.academy/keksobooking/data';
    const urlSend = 'https://js.dump.academy/keksobooking';

    window.load = (onSuccess, onError) => {

        const req = new XMLHttpRequest();
        req.responseType = 'json';

        req.onload = () => {

            if(req.status == 200) {

                onSuccess(req.response);
            } else {

                onError(`Что-то пошло не так, ошибка: ${req.status}`);
            }
        };
        req.onerror = () => onError(`Ошибка соединения: ${req.status}`);

        req.open('GET', url);
        req.send();
    };

    window.save = (data, onLoad, onError) => {

        const req = new XMLHttpRequest();
        req.responseType = 'json';

        req.onload = () => {

            if(req.status == 200) {

                onLoad(req.response);
            } else {

                onError(`Что-то пошло не так, ошибка: ${req.status}`);
            }
        };
        // req.addEventListener('load', function () {
        //     if (req.status === 200) {
        //         onLoad(req.response);
        //     } else {
        //         onError(req.response);
        //     }
        // });
        req.onerror = () => onError(`Ошибка соединения: ${req.status}`);

        req.open('POST', urlSend);
        req.send(data);
    }
})();