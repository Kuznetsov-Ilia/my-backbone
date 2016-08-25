import View from 'my-view';
import {USER, APP} from 'app/globals';
import template from './template';
import events from './events';
export default View.assign({init, template, events});
function init() {
  var auth = () => {
    if (USER.isAuthed()) {
      this.template.set({
        Authed: {email: USER.get('login')},
        NotAuthed: false
      });
    } else {
      this.template.set({
        NotAuthed: true,
        Authed: false
      });
    }
  };
  APP.on('user.auth', auth);
  auth();
}

