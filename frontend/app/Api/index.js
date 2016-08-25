import {USER} from 'app/globals';
import COOKIE from 'my-cookie';
import fetch from 'my-fetch';
import {rand} from 'my-util';
import Promise from 'deferred-promise';
import LIST from './methods';
export default Api;

var SALT = USER.get('salt');
var TOKEN = COOKIE('ot');
var AJAX_ID = 0;
var report = (mess, data) => {
  console.log(mess, data);
  var obj = {
    warn: () => {
      // error.show || alert
      return obj;
    },
    send: () => {
      // radar! || noop
      return obj;
    }
  };
  return obj;
};


function Api(name, method='get', data={}, options) {
  return new Promise((resolve, reject) => {
    if (!(name in LIST)) {
      report('undefined api name', name).send();
      return reject('undefined url:', name);
    }
    var url = uniqAjax(LIST[name]);
    /*if (DEBUG) {
      url = 'http://local.hopbox.ru' + url;
    }*/
    if (SALT) {
      data.salt = SALT;
      data.token = TOKEN;
    }
    data.rnd = rand();
    return fetch(method, url, data, options).then(ok, fail);

    function ok(response) {
      if (response.status === 200) {
        resolve(response);
      } else {
        report('api bad status', response).warn().send();
        reject(response);
      }
      return response;
    }

    function fail(response) {
      reject(response);
      report('api failed', response).warn().send();
    }
  });
}

function uniqAjax (url) {
  return url + '?ajax_id=' + AJAX_ID++;
}
