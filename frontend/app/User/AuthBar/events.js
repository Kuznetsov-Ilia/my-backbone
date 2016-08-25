import {APP, USER} from 'app/globals';
import COOKIE from 'my-cookie';
export default {
  'click [action=logout]': logout
};
function logout (e) {
  e.preventDefault();
  e.stopPropagation();
  COOKIE.remove('token');
  USER.truncate();
  APP.trigger('navigate', '/', 'T');
  APP.trigger('user.auth');
}
