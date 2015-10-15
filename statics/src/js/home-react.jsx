var DnsRow = React.createClass({
  render: function() {
    var dns = this.props.dns;
    return (
      <tr>
        <td> {dns.domain} </td>
        <td> {dns.ips.join(',')} </td>
        <td>
          <a href='javascript:;'>DEL</a>
        </td>
      </tr>
    );
  }
});

var DnsTable = React.createClass({
  render: function() {
    var dnsList = this.props.dnsList;
    var rows = dnsList.map(function(dns) {
      return (<DnsRow key={dns._id} dns={dns} />);
    });
    return (
      <table className='pure-table'>
        <thead>
          <tr>
            <th>Domain</th>
            <th>IP LIST</th>
            <th>OP</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var AddDomain = React.createClass({
  submit: function(e) {
    e.preventDefault()
    var fields = ['domain', 'ips', 'ttl'];
    var refs = this.refs;
    var fail = false;
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
    });
  },
  render: function() {
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
          className='pure-button pure-button-primary'>
          submit
        </button>
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
