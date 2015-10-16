'use strict';
module.exports = [{
  route: '/',
  template: 'home',
  handler: 'dns.view'
}, {
  route: '/dns',
  method: 'post',
  handler: 'dns.add'
}, {
  route: '/dns/:id',
  method: 'delete',
  handler: 'dns.remove'
}];
