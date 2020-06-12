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
    let selectForm = this.element.querySelector('.accounts-select');

    Account.list({}, (err, response) => {
      selectForm.innerHTML = '';
      if (response.success) {
        let arrResponse = response.data;
        arrResponse.forEach(item => {
          let optionElement = document.createElement('option');
          optionElement.setAttribute('value', `${item.id}`);
          optionElement.innerHTML = `${item.name}`;
          selectForm.insertAdjacentElement('beforeEnd', optionElement);
        })
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
