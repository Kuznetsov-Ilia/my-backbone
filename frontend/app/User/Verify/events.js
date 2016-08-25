export default {
  'submit form': submit
};
function submit(e) {
  e.preventDefault();
  var form = e.target;
  var ErrorMessage = false;
  if (!form.password.value) {
    ErrorMessage = {text: 'Введите пароль'};
  }
  if (form.password.value !== form.confirm.value) {
    ErrorMessage = {text: 'Пароли не совпадают'};
  }
  if (!form.adult.checked) {
    ErrorMessage = {text: 'Поставьте галочку "мне есть 18"'};
  }
  var data = {
    login: form.email.value,
    name: form.name.value,
    password: form.password.value,
    finish: 1
  };
  this.trigger('submit', ErrorMessage, data);
}
