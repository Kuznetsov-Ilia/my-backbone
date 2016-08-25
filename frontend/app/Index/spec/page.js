function Page () {}

Page.prototype.open = path => done => browser
  //.sync(console.log)
  .url(`${path}`)
  .call(done);

export default new Page();
