import assert from 'assert';
import Page from './page';
const log = console.log;
log('testing Index page');
describe('About page', () => {
  before(Page.open('/'));
  it('Index page', done => browser
    .getTitle()
      .then(title => assert(title === 'hopbox — Коробка пива с доставкой. Каждую пятницу.'))
    .webdrivercss('About page', [{
      name: 'page',
      elem: '.wrapper_height'
    }]).then(res => {
      assert(res.page[0].isWithinMisMatchTolerance);
      log('Home page screenshots are taken');
    })
    .sync(log)
    .call(done)
  );
});
