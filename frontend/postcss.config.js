module.exports = [
  require('postcss-import'),// to handle @import 'file.css';
  require('postcss-define-property'),// sprite: $url
  require('postcss-simple-vars'),// $color: #eee
  require('postcss-custom-properties')(),// var(--color)
  require('postcss-color-function')(),// color(var(--orange) darken(6%)
  require('autoprefixer')({ browsers: ['last 5 versions'] }),// vendor prefixes
  require('postcss-nested')// :local/global, &-nests
];
