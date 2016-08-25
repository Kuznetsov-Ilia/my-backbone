import {body} from 'my-global';
import {APP, USER} from 'app/globals';
import Api from 'app/Api';
import View from 'my-view';
import template from './template';
import events from './events';
export default View.assign({init, template, events});
var T;
function init({data}) {
  body.classList.add('flags');
  if (USER.isAuthed()) {
    setTimeout(()=> APP.trigger('navigate', '/', 'RT'));
    return false;
  }
  T = this.template;
  var verification_token = data[0];
  if (verification_token) {
    Api('user', 'post', {verification_token}).then(ok, fail);
  } else {
    // copy verification token here!
  }
  this.on({submit}, this);
}
function ok({email}) {
  T.set({VeryfyOk: {email}});
}
function submit(ErrorMessage, data) {
  var VeryfyOk = this.template.get('VeryfyOk');
  VeryfyOk.set({ErrorMessage});
  if (ErrorMessage) {
    return;
  }
  Api('user', 'post', data).then(
    res => {
      USER.set(res.user);
      APP.trigger('user.auth');
      APP.trigger('navigate', '/', 'RT');
    },
    res => VeryfyOk.set('ErrorMessage', {text: res.errmsg})
  );
}

function fail({errmsg}) {
  var reason = errmsg || 'Эта ссылка более недействительна, повторите регистрацию сначала.';
  T.set({VeryfyFail: {reason}, VeryfyOk: false});
}
