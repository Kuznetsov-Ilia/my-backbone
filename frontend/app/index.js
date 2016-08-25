import {location, body} from 'my-global';
import UserAuthBar from 'app/User/AuthBar';
import Router from 'app/Router';
import history from 'app/Router/history';

var ROUTER = new Router();/*eslint no-new:0*/
ROUTER.template.render(body);
ROUTER.history.start(history);
ROUTER.template.set('UserAuthBar', true);
new UserAuthBar({template: ROUTER.template.get('UserAuthBar')});

if (module.hot) {
  module.hot.accept(() => {// accept update of dependency
    ROUTER.history.loadUrl(location.pathname);
    console.log('app HRM');
  });
}
