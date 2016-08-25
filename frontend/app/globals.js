import {window, document} from 'my-global';
import {Eventable} from 'my-event';
import User from 'app/User';

var USER = new User();
var APP = Eventable({});
USER.setup(window.CURRENT_USER);
window.CURRENT_USER = null;

export {USER, APP};

APP.on('user.auth', bind);
bind();

function bind(){
  if (USER.isAuthed()) {
    document.on('click.needAuth .action--need-auth', needAuth);
  } else {
    document.off('click.needAuth');
  }
}

function needAuth(e) {
  USER.showAuth();
  e.stopPropagation();
  e.preventDefault();
  return false;
}
