import { Eventable } from 'my-event';
export default User;
function User() {
  this.data = {};
}
Object.assign(Eventable(User.prototype), {
  setup(CU) {
    if (CU !== null && CU !== undefined) {
      CU.nick = CU.nickName;
      this.set(CU);
    }
  },

  get(key) {
    if (key === undefined) {
      return this.data;
    } else {
      return this.data[key];
    }
  },

  truncate() {
    this.data = {};
  },

  set(key, value) {
    switch (typeof key) {
    case 'object':
      Object.assign(this.data, key);
      break;
    case 'string':
    case 'number':
      this.data[key] = value;
      break;
    }
  },

  isAuthed() {
    return this.data.id > 0;
  },

  isAdmin() {
    return this.get('group') === 'admin';
  },

  showAuth() {},

  hideAuth() {},

  isMy(input) {
    return this.isAuthed() && input
      && Object.keys(input).every(key => input[key] === this.data[key]);
  }
});

