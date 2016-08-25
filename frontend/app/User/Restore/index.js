import View from 'my-view';
import {USER, APP} from 'app/globals';
import template from './template';
import Api from 'app/Api';
export default View.assign({init, template});
var T;
function init ({data}) {
  if (USER.isAuthed()) {
    APP.trigger('navigate', '/', 'RT');
  }
  T = this.template;
  T.get('form').el.on('submit', submit(data[0]));
}
function submit(password_token) {
  return e => {
    e.preventDefault();
    var form = e.target;
    var password = form.password.value;
    Api('user', 'post', {password_token, password})
      .then(ok, fail);
  };
}

function ok() {
  T.set('Logs', {text: 'Пароль изменён'});
  setTimeout(
    ()=> APP.trigger('navigate', '/', 'T'),
    2000
  );
}
function fail (res) {
  T.set('Logs', res.errmsg);
}
