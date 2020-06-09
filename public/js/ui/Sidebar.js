/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector('.sidebar-mini');
    const sidebarButton = document.querySelector('.visible-xs');
    let sidebarActive = false;

    sidebarButton.onclick = function(event) {
      event.preventDefault();

      if (!sidebarActive) {
        body.classList.add('sidebar-open');
        body.classList.add('sidebar-collapse')
        sidebarActive = true;
      } else {
        body.classList.remove('sidebar-open');
        body.classList.remove('sidebar-collapse')
        sidebarActive = false;
      }
    }

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerButton = document.querySelector('.menu-item_register');

    registerButton.addEventListener('click', function(event) {
      event.preventDefault();
      App.getModal('register').open();
    })

    const loginButton = document.querySelector('.menu-item_login');

    loginButton.addEventListener('click', function() {
      event.preventDefault();
      App.getModal('login').open();
    })

    const logoutButton = document.querySelector('.menu-item_logout');

    logoutButton.addEventListener('click', function() {
      event.preventDefault();
      User.logout(User.current(), (err, response) => {
        if (response.success) {
          User.unsetCurrent()
          App.setState( 'init' );
        }
      })
    })
  }
}
