'use strict';
const mongodb = localRequire('helpers/mongodb');
const moment = require('moment');
const errors = localRequire('errors');
const debug = localRequire('helpers/debug');
const _ = require('lodash');
const Joi = require('joi');

exports.create = create;
exports.list = list;
exports.remove = remove;

/**
 * [create description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function create(data) {
  let schema = {
    domain: Joi.string().required(),
    ips: Joi.array().required(),
    ttl: Joi.number().integer()
  };
  data = Joi.validateThrow(data, schema, {
    stripUnknown: true
  });
  debug('create dns log:%j', data);
  let DNS = mongodb.model('Dns');
  return new DNS(data).save();
}


/**
 * [list description]
 * @param  {[type]} skip [description]
 * @param  {[type]} limit [description]
 * @return {[type]}       [description]
 */
function list(skip, limit) {
  skip = skip || 0;
  limit = limit || 10;
  let DNS = mongodb.model('Dns');
  return DNS.find({}).skip(skip).limit(limit).lean().exec();
}

/**
 * [remove description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function remove(id) {
  let DNS = mongodb.model('Dns');
  return DNS.findByIdAndRemove(id).lean().exec();
}
