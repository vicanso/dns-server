var DnsRow = React.createClass({
  removeDnsRecord: function () {
    var dns = this.props.dns;
    DNS.removeRecord(dns._id).then(function () {
      location.reload();
    }, function() {

    });
  },
  render: function() {
    var dns = this.props.dns;
    return (
      <tr>
        <td> {dns.domain} </td>
        <td> {dns.ips.join(',')} </td>
        <td> {dns.ttl} </td>
        <td>
          <a href='javascript:;' onClick={this.removeDnsRecord}>DEL</a>
        </td>
      </tr>
    );
  }
});

var DnsTable = React.createClass({
  render: function() {
    var dnsList = this.props.dnsList;
    var rows = dnsList.map(function(dns, i) {
      return (<DnsRow key={i} dns={dns} />);
    });
    return (
      <table className='pure-table'>
        <thead>
          <tr>
            <th>Domain</th>
            <th>IP LIST</th>
            <th>TTL</th>
            <th>OP</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var AddDomain = React.createClass({
  getInitialState: function() {
    return {
      status: ''
    };
  },
  submit: function(e) {
    e.preventDefault()
    var self = this;
    if (self.state.status === 'submitting') {
      return;
    }
    var fields = ['domain', 'ips', 'ttl'];
    var refs = this.refs;
    var fail = false;
    var data = {};
    fields.forEach(function (field) {
      if(fail) {
        return;
      }
      var dom = refs[field];
      var v = dom.value;
      if(!v) {
        dom.focus();
        fail = true;
      }
      data[field] = v;
    });
    if (fail) {
      return;
    }
    data.ips = data.ips.split(',');

    self.setState({status: 'submitting'});
    DNS.addRecord(data).then(function (res) {
      location.reload();
    }, function (res) {
      self.setState({status: 'error'});
    });

  },
  render: function() {
    var classes = classNames({
      'pure-button': true,
      'pure-button-primary': true,
      'pure-button-disabled': this.state.status === 'submitting'
    });


    return (
      <form className='pure-form addDomain' onSubmit={this.submit}>
        <input
          type='text'
          placeholder='domain'
          ref='domain'/>
        <input
          type='text'
          placeholder='ip addresss, user "," divide'
          ref='ips' />
        <input
          type='number'
          placeholder='ttl'
          ref='ttl' />
        <button
          type='submit'
          className={classes}>
          submit
        </button>
        <span>{this.state.status}</span>
      </form>
    );
  }
});

var DnsContaienr = React.createClass({
  getInitialState: function() {
    return {
      dnsList : JT_GLOBAL.dnsList
    };
  },
  render: function() {
    return (
      <div className='dnsContainer'>
        <DnsTable dnsList={this.state.dnsList} />
        <AddDomain />
      </div>
    );
  }
});


ReactDOM.render( <DnsContaienr / > ,
  document.getElementById('dnsContainer')
);
