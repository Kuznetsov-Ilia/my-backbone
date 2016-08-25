var assert = require('assert');
//import assert from 'assert';
//const log = console.log;
describe('not autorized user', () => {
  before(done => browser/*.sync(log)*/.url('/').call(done));

  var authSelector = '#PH_authLink';
  var loginFrame = '.ag-popup__frame__layout__iframe';
  var loginForm = 'form[name=login]';
  var inputUsername = 'input[name=Username]';
  var inputPassword = 'input[name=Password]';

  it('simple login', done => browser
    .click(authSelector)
    .waitForExist(loginFrame, 1000)
    .frame(0)
    .waitForExist(loginForm, 1000)
    .setValue(inputUsername, 'killxxxvi@mail.ru')
    .setValue(inputPassword, 'qwertytwamjmart')
    .submitForm(loginForm)
    .call(done)
  );

  var vkButton = 'span[data-id=vk]';
  var vkForm = '#login_submit';
  var PHUserEmail = '#PH_user-email';
  var PHLoginAnother = '#PH_loginAnotherLink';
  it('add social login', done => browser
    .click(PHUserEmail)
    .waitForExist(PHLoginAnother, 1000)
    .click(PHLoginAnother)
    .waitForExist(loginFrame, 1000)
    .frame(1)
    .click(vkButton)
    .waitForExist(vkForm, 1000)
    .setValue('input[name=email]', 'killxxxvi@mail.ru')
    .setValue('input[name=pass]', '!twamjmart')
    .submitForm(vkForm)
    .call(done)
  );
});
