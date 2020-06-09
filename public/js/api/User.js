/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor() {
    this.URL = '/user';
  }
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.clear();    
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f) {
    createRequest({
      url: `${(new User()).URL}/current`,
      headers: {'Content-type': 'application/json'},
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: (err, response) => {
        try {
          callback(null, response);
        } catch {
          callback(err, null);
        }
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f) {
    createRequest({
      url: `${(new User()).URL}/login`,
      headers: {'Content-type': 'application/json'},
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        try {
          callback(null, response);
        } catch {
          callback(err, null);
        }
      }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {
    createRequest({
      url: `${(new User()).URL}/register`,
      headers: {'Content-type': 'application/json'},
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        try {
          callback(null, response);
        } catch {
          callback(err, null);
        }
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f) {
    createRequest({
      url: `${(new User()).URL}/logout`,
      headers: {'Content-type': 'application/json'},
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        try {
          callback(null, response);
        } catch {
          callback(err, null);
        }
      }
    })
  }
}