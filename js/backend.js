// получение и отправка данных на сервер
(function () {

	const url     = 'https://run.mocky.io/v3/2dc10ffc-6caa-4204-8462-c627aafbfec9';
	const urlSend= 'https://javascript.pages.academy/keksobooking';

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
        req.onerror = () => onError(`Ошибка соединения: ${req.status}`);

        req.open('POST', urlSend);
        req.send(data);
    }
})();
