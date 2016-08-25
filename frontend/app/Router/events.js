import {document} from 'my-global';
import {APP} from 'app/globals';
import {UA, CLICK, TRIGGER} from './index';
export default function(router) {
  APP.on('navigate', navigate);
  document.on('click a', documentOnClick);
  document.on('click button[href]', documentOnClick);

  function documentOnClick(e) {
    var a = e.target;
    var href = a.getAttribute('href');
    if (!href || // нет маршрута
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.metaKey ||
      a.target || // внешние ссылки
      (a.rel === 'nofollow') || // ссылки из контента
      (href.indexOf('#') === 0) || // якоря
      (href.indexOf('javascript:') === 0) ||/*eslint no-script-url: 0*/ //legacy js ссылки
      (href.indexOf('mailto:') === 0) || // почтовые ссылки
      (href.indexOf('http') === 0) || // внешние ссылки
      (href.indexOf('//') === 0) // внешние ссылки
    ) {
      return true;
    }
    e.stopPropagation();
    e.preventDefault();
    router.navtype = CLICK;
    router.navigate(href, { trigger: true });
    router.navtype = UA;
    //return false;
  }

  function navigate(url, opts) {
    var options = {};
    opts = opts || '';
    options.trigger = opts.indexOf('T') !== -1;
    options.replace = opts.indexOf('R') !== -1;
    router.navtype = TRIGGER;
    router.navigate(url, options);
    router.navtype = UA;
  }
}
