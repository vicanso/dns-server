(function () {
  var urls = {
    addDns: '/dns',
    removeDns: '/dns'
  };
  this.DNS = {
    addRecord: addRecord,
    removeRecord: removeRecord
  };

  function addRecord(data) {
    return reqwest({
      url: urls.addDns,
      method: 'post',
      data: data
    });
  }

  function removeRecord(id) {
    return reqwest({
      url: urls.removeDns + '/' + id,
      method: 'delete'
    });
  }
}).call(this);
