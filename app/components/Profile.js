var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
	mixins: [Router.State, ReactFireMixin],
	getInitialState: function(){
		return { 
			query: '',
			appearances: [
				{
					factory: '',
					factoryRange: 'hello',
					factoryDesc: '124',
					pentagonName: '',
					material: 'porcelain',
					colour: 'white',
					finish: '',
					size: '',
					shape: '',
					traffic: '',
					look: '',
					location: '',
					imageThumb: ''
				},
				{
					factory: '',
					factoryRange: 'hahaha',
					factoryDesc: '123',
					pentagonName: '',
					material: '',
					colour: 'black',
					finish: '',
					size: '',
					shape: '',
					traffic: '',
					look: '',
					location: '',
					imageThumb: ''
				}
			] 
		}
	},

	handleChange: function( event ) {
    this.setState({ query: event.target.value });
  },
	
	render: function(){
		var aprncs = this.state.appearances,
        query = this.state.query.trim().toLowerCase();

    // For the next bits of fun, make sure you
    // have typed something into the input!

    if (query.length > 0) {
      aprncs = aprncs.filter(
        // Feeling lucky? Try swapping these lines:
        // () => Math.random() > 0.5
        lib => lib.material.toLowerCase().match(query)
      );
    }

    // You know what to do:
    // return <i>{aprncs.map(l => l.name).join(', ')} are friends!</i>;

    return (
      <div>
        <input type='text' // try 'date'
               value={this.state.query/*.toUpperCase()*/}
               onChange={this.handleChange}
               // onMouseEnter={() => this.setState({ query: 'react' })}
               placeholder='Type to search' />
        <ul>
          {aprncs.map(appr =>
            <li key={appr.factoryDesc}>
              <a href={appr.url} target='_blank'>
              	{appr.colour} - {appr.factoryRange}
              </a>
            </li>
          )}
        </ul>
        {
        	aprncs.length === 0 && 
        	<i>Nothing matched your search</i>
        }
      </div>
    );
	}
});

module.exports = Profile;