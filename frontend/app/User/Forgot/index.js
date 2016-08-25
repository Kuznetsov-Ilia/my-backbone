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
  var email = form.email.value;
  Api('user', 'post', {forgot: email})
    .then(showOk, showError);
}

function showError (res) {
  if (res.errmsg) {
    T.set({
      Errors: {text: res.errmsg},
      Ok: false
    });
  }
}
function showOk(){
  T.set({
    Ok: true,
    Errors: false
  });
}
