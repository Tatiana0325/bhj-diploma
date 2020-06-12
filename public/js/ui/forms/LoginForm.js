/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.login(options, (err, response) => {
      let loginForm = this.element.querySelectorAll('.form-control');
      if (response.success) {
        User.setCurrent(response.user);
        App.setState( 'user-logged' );
        loginForm.forEach(item => {
          item.value = '';
        })
        App.getModal('login').close();  
      }
    }) 
  }
}
