/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  constructor() {
    this.URL = '';
  }

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let url = new this().URL;
    createRequest({
      url: url,
      headers: {'Content-type': 'application/json'},
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: callback/*(err, response) => {
        try {
          callback(null, response);
        } catch {
          callback(err, null);
        }
      }*/
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let url = new this().URL;
    let modifiedData = Object.assign({'_method': 'PUT'}, data );

    createRequest({
      url: url,
      headers: {'Content-type': 'application/json'},
      data: modifiedData,
      responseType: 'json',
      method: 'POST',
      callback: callback
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let url = new this().URL;
    createRequest({
      url: url + `/${id}`,
      headers: {'Content-type': 'application/json'},
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: callback
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let url = new this().URL;
    let modifiedData = Object.assign({'_method': 'DELETE'}, data );
    let modifiedData2 = Object.assign({'id': `${id}`}, modifiedData);
    
    createRequest({
      url: url,
      headers: {'Content-type': 'application/json'},
      data: modifiedData2,
      responseType: 'json',
      method: 'POST',
      callback: callback
    })
  }
}