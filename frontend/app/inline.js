window.WebFontConfig = {
  google: {
    families: ['Roboto:400,300,700,100:cyrillic', 'Roboto+Slab:400,300,700,100:cyrillic']
  }
};
(function () {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-74410837-1', 'auto');
ga('send', 'pageview');

(function (d, w, c) {
  (w[c] = w[c] || []).push(function () {
    try {
      w.yaCounter36088445 = new Ya.Metrika({
        id: 36088445,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    } catch (e) {}
  });
  var n = d.getElementsByTagName('script')[0],
    s = d.createElement('script'),
    f = function () {
      n.parentNode.insertBefore(s, n);
    };
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://mc.yandex.ru/metrika/watch.js';
  if (w.opera == '[object Opera]') {
    d.addEventListener('DOMContentLoaded', f, false);
  } else {
    f();
  }
})(document, window, 'yandex_metrika_callbacks');

function js(path) {
  var s = 'script';
  document.write('<' + s + ' src="' + path + '"></' + s + '>');
}
[].forEach || js('https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.14/es5-shim.min.js');
