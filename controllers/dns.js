'use strict';
const Joi = require('joi');
const dnsService = localRequire('services/dns');

exports.view = view;
exports.add = add;
exports.remove = remove;
/**
 * [view description]
 * @return {[type]} [description]
 */
function* view() {
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

/**
 * [add description]
 */
function* add() {
  /*jshint validthis:true */
  let ctx = this;
  let schema = {
    domain: Joi.string().hostname().required(),
    ips: Joi.array().items(Joi.string().ip()).required(),
    ttl: Joi.number().integer().required()
  };
  let data = Joi.validateThrow(ctx.request.body, schema);
  let doc = yield dnsService.create(data);
  console.dir(doc.toObject());
  ctx.body = null;
}


/**
 * [remove description]
 * @return {[type]} [description]
 */
function* remove() {
  /*jshint validthis:true */
  let ctx = this;
  let id = ctx.params.id;
  ctx.body = yield dnsService.remove(id);
}
