/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let selectIncome = document.getElementById('income-accounts-list');
    let selectExpense = document.getElementById('expense-accounts-list');

    let lastSelectIncome = selectIncome.querySelectorAll('option');
    if(lastSelectIncome != null) {
      for (let i = 0; i < lastSelectIncome.length; i++) {
        lastSelectIncome[i].remove();
      }
    };

    let lastSelectExpense = selectExpense.querySelectorAll('option');
    if(lastSelectExpense != null) {
      for (let i = 0; i < lastSelectExpense.length; i++) {
        lastSelectExpense[i].remove();
      }
    }

    function selectHTML(id, name) {
      let optionElement = document.createElement('option');
        optionElement.setAttribute('value', `${id}`);
        optionElement.innerHTML = `${name}`;
        return optionElement;
    }

    Account.list(User.current(), (err, response) => {
      if (response.success) {
        for (let i = 0; i < response.data.length; i++) {          
          selectIncome.insertAdjacentElement('beforeEnd', selectHTML(response.data[i].id, response.data[i].name));
          selectExpense.insertAdjacentElement('beforeEnd', selectHTML(response.data[i].id, response.data[i].name));
        }
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if(response.success) {
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        
        let inputIncome = document.getElementById('modal-new-income').querySelectorAll('.form-control');
        let inputExpense = document.getElementById('modal-new-expense').querySelectorAll('.form-control');
        inputIncome[0].value = ''; 
        inputIncome[1].value = '';  
        inputExpense[0].value = ''; 
        inputExpense[1].value = ''; 
      }
    })
  }
}
