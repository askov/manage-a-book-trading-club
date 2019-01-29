/* setup.js */

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('', {
  url: "http://localhost",
  // url: '',
});
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};

copyProps(window, global);

// console.log(JSON.stringify(global.window.location))
const location = JSON.parse(JSON.stringify(global.window.location))
delete global.window.location;
global.window.location = location
// console.log(( Object.getOwnPropertyDescriptors(global.window.location.assign)))
// // Object.defineProperty(global.window.location, 'assign', {
// //   writable: true,
// //   value: ''
// // });