'use strict';

const dnsService = localRequire('services/dns');

module.exports = home;

/**
 * [home description]
 * @return {[type]} [description]
 */
function* home() {
  /*jshint validthis:true */
  let ctx = this;
  let dnsList = yield dnsService.list();
  ctx.state.viewData = {
    name: 'vicanso',
    globals: {
      dnsList: dnsList
    }
  };
}
