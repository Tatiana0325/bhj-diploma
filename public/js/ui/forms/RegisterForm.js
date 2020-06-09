/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    let inputRegister = document.getElementById('modal-register').querySelectorAll('.form-control');

     User.register(options, (err, response) => {
        if (response.success) {
          User.setCurrent(response.user);
          App.setState( 'user-logged' );
          App.getModal('register').close(); 
        }
    })
    inputRegister[0].value = '';
    inputRegister[1].value = '';
    inputRegister[2].value = '';;
  }
}
