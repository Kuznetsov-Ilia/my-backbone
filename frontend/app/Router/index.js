import {window, location, body} from 'my-global';
import Router from 'my-backbone-router';
import {isFunction} from 'my-util';
import {APP} from 'app/globals';
import events from './events';
import template from './template';
import routes from './routes';
export const UA = 0;
export const INITIAL = 1;
export const CLICK = 2;
export const TRIGGER = 3;
export default Router.assign({ init, routes, template, navtype: INITIAL });
import IndexPage from 'app/Index/Page';
import UserVerify from 'app/User/Verify';
import UserLogin from 'app/User/Login';
import UserRestore from 'app/User/Restore';
import UserForgot from 'app/User/Forgot';
import OrderForm from 'app/Order/Form';
import OrderMy from 'app/Order/My';
import OrderEdit from 'app/Order/Edit';
import OrderCancel from 'app/Order/Cancel';
import OrderMake from 'app/Order/Make';
import Feedback from 'app/Feedback/Page';
import AboutPage from 'app/About/Page';
import NotFound from 'app/NotFound';
//const publicRoutes = ['IndexPage', 'OrderForm', 'OrderCancel', 'UserLogin'];
const PAGES = {IndexPage, UserVerify, UserLogin, UserRestore, UserForgot, OrderForm, OrderCancel, Feedback, AboutPage, OrderMy, OrderEdit, OrderMake, NotFound};
var prevRouteName;
function init () {
  this.on({route});
  events(this);
  APP.on({
    'footer:show': ()=> this.template.set('Footer', true),
    'footer:hide': ()=> this.template.set('Footer', false),
    'user.auth': () => this.history.loadUrl(location.pathname)
  });

}

function route (routeName, data) {
  var Page = PAGES[routeName];
  if (this.page) {
    window.ga('send', 'pageview', location.pathname);
    if (isFunction(this.page.remove)) {
      this.page.remove();
    }
    this.page = null;
  }
  APP.trigger('AdminMenuSub:set', 'Item', false);
  if (prevRouteName !== undefined) {
    this.template.set(prevRouteName, false);
  }
  if (!['Index', 'UserLogin', 'UserRestore', 'UserForgot'].contains(routeName)) {
    APP.trigger('footer:show');
  }
  body.classList.remove('box');
  body.classList.remove('flags');
  var template = this.template.get(routeName);
  this.page = new Page({ data, template });
  this.template.set(routeName, true);
  prevRouteName = routeName;
}

var EL;

export function handle(PageConstructor) {
  return () => {
    //var timer = setTimeout(() => preloader(this.el, 1), 250);
    var stopPreloader = () => {
      /*clearTimeout(timer);
      preloader(this.el, 0);*/
    };
    EL = EL || this.template.get('page').el;
    if (this.page) {
      if (isFunction(this.page.remove)) {
        this.page.remove();
      }
      this.page = null;
    }
    this.page = new PageConstructor({
      stopPreloader,
      data: arguments,
      el: EL
    });
  };
}

if (module.hot) {
  module.hot.accept(() => {// accept update of dependency
    //if (EL) {
      console.log('router HRM');
      //EL.html('');
    //}
    //this.history.loadUrl(window.location.pathname);
  });
}
