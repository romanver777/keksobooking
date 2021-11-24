// получение и отправка данных на сервер
(function () {

	const url     = 'https://run.mocky.io/v3/fbca871f-d8a7-4abe-ace8-db9afeb4cb8a';
	const urlSend= 'https://javascript.pages.academy/keksobooking';

    window.load = (onSuccess, onError) => {

        const req = new XMLHttpRequest();
        req.responseType = 'json';

        req.onload = () => {

            if(req.status == 200) {

                onSuccess(req.response);
            } else {

                onError("error", `Что-то пошло не так, ошибка: ${req.status}`);
            }
        };
        req.onerror = () => onError("error", `Ошибка соединения: ${req.status}`);

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

                onError("error", `Что-то пошло не так, ошибка: ${req.status}`);
            }
        };
        req.onerror = () => onError("error", `Ошибка соединения: ${req.status}`);

        req.open('POST', urlSend);
        req.send(data);
    }
})();
