/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try {
      this.element = element;
      this.registerEvents();
      this.update();
    } catch {
      if (element == undefined) {
        throw new Error('Елемент не сущесвует');
      }
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let accountCreate = false;

    let newAccount = document.querySelector('.create-account');
    newAccount.addEventListener('click', (event) => {
      event.preventDefault();
      App.getModal('createAccount').open();
    });

    const accountUl = document.querySelector('.accounts-panel');
    accountUl.addEventListener('click', (e) => {
      e.preventDefault();

      let accountArray = accountUl.querySelectorAll('.account');

      if(accountArray != null) {
        for(let i = 0; i < accountArray.length; i++) {
          accountArray[i].addEventListener('click', (e) => {
            e.preventDefault();
            this.onSelectAccount(accountArray[i]);
          })
        }
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    Account.list(User.current(), (err, response) => {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
        }
    })
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accountWidget = document.querySelectorAll('.account');
    if(accountWidget != null) {
      for (let i = 0; i < accountWidget.length; i++) {
        accountWidget[i].remove();
      }
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let activeElement = element.closest('.accounts-panel').querySelector('.active');

    if(activeElement != null) {
      activeElement.classList.remove('active');
    }

    element.classList.add('active');
    App.showPage( 'transactions', { 'account_id': element.getAttribute('data-id')});
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let newLi = document.createElement('li');
    newLi.classList.add('account');
    newLi.setAttribute('data-id', `${item.id}`)
    newLi.innerHTML = `
      <a href="#">
      <span>${item.name}</span> /
      <span>${item.sum} ₽</span>
      </a>
    `;

    return newLi;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    let accountsWidget = document.querySelector('.accounts-panel');

    for (let i = 0; i < item.length; i++) {
      accountsWidget.insertAdjacentElement('beforeEnd', this.getAccountHTML(item[i]));
    }
  }
}