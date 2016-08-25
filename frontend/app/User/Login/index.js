import View from 'my-view';
import {USER, APP} from 'app/globals';
import template from './template';
import Api from 'app/Api';
export default View.assign({init, template});
var T;
function init () {
  if (USER.isAuthed()) {
    APP.trigger('navigate', '/', 'RT');
  }
  T = this.template;
  T.get('form').el.on('submit', submit);
}
function submit(e) {
  e.preventDefault();
  var form = e.target;
  var login = form.login.value;
  var password = form.password.value;
  Api('auth', 'post', {login, password}).then(
    res => {
      USER.set(res.user);
      APP.trigger('navigate', '/', 'T');
      APP.trigger('user.auth');
    },
    /*setTimeout(() => window.location.href = '/', 300)*/
    showError
  );
}

function showError (res) {
  if (res.errmsg) {
    T.set('Errors', {text: res.errmsg});
  }
}
