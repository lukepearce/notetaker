var React = require('react');
var NotesList = require('./NotesList');

var Notes = React.createClass({
  render: function(){
    return (
      <div>
        <NotesList notes={this.props.notes} />
      </div>
    )
  }
});

module.exports = Notes;