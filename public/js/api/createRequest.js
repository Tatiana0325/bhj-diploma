/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    if(options.method == 'GET') {
        let string = `${options.url}?`;

        for (let key in options.data) {
            string += `${key}=${options.data[key]}&`;
        }
        let url = string.slice(0, -1);
        try {
            xhr.open(options.method, url);
            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    options.callback(null, JSON.parse(xhr.response));
                }
            })
            xhr.send();
        } catch {
           options.callback(xhr.status, null);
        }

        return xhr;
    } else {
        let formData = new FormData();

        for (let key2 in options.data) {
            formData.append(`${key2}`, `${options.data[key2]}`);
        }

        try {
            xhr.open(options.method, options.url);
            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let response = JSON.parse(xhr.response);
                    options.callback(null, response);
                }
            })
        
            xhr.send(formData);
        } catch {
            let err = xhr.status;
            options.callback(err, null);
        }

        return xhr;
    }    
};