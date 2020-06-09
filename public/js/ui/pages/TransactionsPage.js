/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    try{
      this.element = element;
      this.registerEvents();
    } catch {
      if (element == undefined) {
        throw new Error('Передан пустой элемент');
      }
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAccount = document.querySelector('.remove-account');

    removeAccount.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeAccount();
      const accountTitle = document.querySelector('.content-title');
      accountTitle.textContent = 'Название счета';

      const removeTransaction = document.querySelectorAll('.transaction__remove');
    
      for (let i = 0; i < removeTransaction.length; i++) {
        removeTransaction[i].addEventListener('click', (e) => {
          e.preventDefault();
          this.removeTransaction(removeTransaction[i].getAttribute('data-id'));
        })
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
      let result = confirm('Вы действительно хотите удалить счёт?');

      if(result) {
        Account.remove(this.lastOptions.account_id, '', (err, response) => {
          if(response.success) {
            App.update();
          }
        } ) 
      } else {
        return false;
      }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    let result = confirm('Вы действительно хотите удалить эту транзакцию?');

    if(result) {
      Account.remove(id, '', (err, response) => {
        if(response.success) {
          App.update();
        }
      } ) 
    } else {
      return false;
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options != undefined) {
      this.lastOptions = options;
      Account.get(options.account_id, '', (err, response) => {
        if(response.success) {
          this.renderTitle(response.data.name);
          Transaction.list(response.data, (err, response) => {
            if(response.success) {
              this.renderTransactions(response.data)
            }
          })
        }
      });
    this.lastOptions;
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const accountTitle = document.querySelector('.content-title');
    accountTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let data = new Date(date);

    const year = data.getFullYear();

    let month = '';
    const monthNum = data.getMonth();
    switch (monthNum) {
      case 0: month = 'января'; break;
      case 1: month = 'февраля'; break;
      case 2: month = 'марта'; break;
      case 3: month = 'апреля'; break;
      case 4: month = 'мая'; break;
      case 5: month = 'июня'; break;
      case 6: month = 'июля'; break;
      case 7: month = 'августа'; break;
      case 8: month = 'сентября'; break;
      case 9: month = 'октября'; break;
      case 10: month = 'ноября'; break;
      case 11: month = 'декабря'; break;
    }

    let day = data.getDate();
     if(day < 10) {
       day = `0${day}`;
     }

     let hours = data.getHours();
     if(hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = data.getMinutes();
     if(minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${month} ${year} г. в ${hours}:${minutes}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let newDiv = document.createElement('dic');
    newDiv.classList.add('transaction')
    newDiv.classList.add(`transaction_${item.type}`);
    newDiv.classList.add('row');
    newDiv.innerHTML = `
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
        <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
        <h4 class="transaction__title">${item.name}</h4>
        <div class="transaction__date">${this.formatDate(item.date)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
        ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
      <button class="btn btn-danger transaction__remove" data-id=${item.id}>
          <i class="fa fa-trash"></i>  
      </button>
    </div>
    `;

    return newDiv;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const transactionPage = document.querySelector('.content');

    for (let i = 0; i < data.length; i++) {
      transactionPage.insertAdjacentElement('beforeEnd', this.getTransactionHTML(data[i])); 
    }
  }
}