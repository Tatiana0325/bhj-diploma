/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let dismissModal = this.element.querySelectorAll(`button[data-dismiss='modal']`);

    for (let i = 0; i < dismissModal.length; i++) {
      dismissModal[i].addEventListener('click', this.onClose(dismissModal[i]));
    }

    this.dismissModal = dismissModal;
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.onclick = (e) => {
      e.preventDefault();
      this.close();
    }
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    for (let i = 0; i < this.dismissModal.length; i++) {
      this.dismissModal[i].addEventListener('click', this.onClose(this.dismissModal[i]));
    }
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.setAttribute('style', 'display: block');
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.removeAttribute('style');    
  }
}
