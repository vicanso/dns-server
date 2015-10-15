'use strict';
module.exports = {
  schema: {
    domain: {
      type: String,
      required: true,
      unique: true
    },
    ips: [

    ],
    ttl: {
      type: Number,
      required: true,
      'default': 600
    },
    createdAt: {
      type: String,
      required: true
    },
    updatedAt: {
      type: String,
      required: true
    }
  },
  // 索引数组
  indexes: [{
    account: 1
  }, {
    account: 1,
    lastLoginedAt: 1
  }],
  pre: {
    validate: function(next) {
      let now = (new Date()).toISOString();
      if (!this.createdAt) {
        this.createdAt = now;
        this.updatedAt = now;
      }
      next();
    }
  }
  // 定义在mongodb中collection的名字
  // name : 'xxx'
};
