import {body} from 'my-global';
import 'app/styles/animation';
import { IndexPage as template } from './template';
import View from 'my-view';
import Api from 'app/Api';
import MyOrder from 'app/Order/My';
import {USER, APP} from 'app/globals';
import events from './events';
export default View.assign({ init, template, events });
const resetKeys = {
  Invite: false,
  MyOrder: false,
  IWantBeer: false,
  OrderForm: false,
  FeedbackForm: false,
  OrderIsBlocked: false,
  Logs: false
};
var T;
function init () {
  T = this.template;
  T.set(resetKeys);
  if (USER.isAuthed()) {
    APP.trigger('footer:show');
    Api('order', 'get', {my: 1}, {credentials: 'include'})
      .then(handleOrder, logError);
  } else {
    body.classList.add('box');
    APP.trigger('footer:hide');
    T.set('Invite', true);
    T.get('Invite').get('form').el.on('submit', submit);
  }
}
function logError(res) {
  if (res.errmsg) {
    T.set('Logs', {text: res.errmsg});
  }
}
function handleOrder(res) {
  if (!res) {
    return false;
  }
  if (res.order) {
    T.set('MyOrder', true);
    new MyOrder({
      template: T.get('MyOrder'),
      args: res
    });
  } else {
    Api('settings', 'get', {order: 1}, {credentials: 'include'})
      .then(checkIfBlocked(res));
  }
}
function checkIfBlocked (order) {
  return (res) => {
    if (Number(res.blocked)) {
      T.set('OrderIsBlocked', true);
      T.get('OrderIsBlocked').set('details', res.details);
    } else {
      if (typeof order.date === 'string') {
        T.set('IWantBeer', {date: order.date.replace(' ', '&nbsp;')});
      }
    }
  };
}

function submit(e) {
  e.preventDefault();
  var form = e.target;
  var email = form.email.value;
  var error = email.length === 0 || email.indexOf('@') === -1 || email.indexOf('.') === -1;
  var Invite = T.get('Invite');
  if (error) {
    Invite.set('InvalidEmail', true);
  } else {
    Invite.set('InvalidEmail', false);
    if (form.submitButton.disabled) {
      return false;
    }
    form.submitButton.disabled = true;
    var enableBtn = () => form.submitButton.disabled = false;
    Api('user', 'put', {email}).then(
      ok,
      res => {
        failed(res);
        enableBtn();
      });
  }
  function ok() {
    Invite.get('all_inputs').el.classList.add('bounceOut');
    setTimeout(()=> {Invite.get('all_inputs').el.remove(); }, 500);
    Invite.set({
      Success: {email},
      Failed: false,
      NotOk: false
    });
  }
  function failed(res) {
    if (res.errmsg) {
      Invite.set({
        NotOk: {text: res.errmsg},
        Failed: false,
        Success: false
      });
    } else {
      Invite.set({
        Failed: true,
        Success: false,
        NotOk: false
      });
    }
  }
}
