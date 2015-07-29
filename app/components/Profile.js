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
			filter: '',
			filterType: ''
		}
	},

	getDefaultProps: function () {

    return {
      filters: [
				{ 
					name: 'material',
					options: [ 'porcelain', 'stone' ] 
				},
				{ 
					name: 'colour',
					options: [ 'white', 'black' ] 
				},
			],
      appearances: [
				{
					factory: 'IMOLA',
					factoryRange: 'MICRON 2.0',
					factoryDesc: 'M2.0 36W',
					pentagonName: 'MAGNITUDE.0 36W',
					material: 'Porcelain',
					colour: 'White',
					finish: ['Matt', 'Polished', 'Bush Hammered'],
					size: ['9.5x60', '30x60', '60x60', '60x120', '120x120'],
					shape: ['Rectangle', 'Square'],
					traffic: 'Commercial',
					look: 'Plain',
					location: 'Floor',
					imageThumb: './assets/img/M2-0-60W.jpg'
				},
				{
					factory: 'IMOLA',
					factoryRange: 'MICRON 2.0',
					factoryDesc: 'M2.0 36A',
					pentagonName: 'MAGNITUDE.0 36A',
					material: 'Porcelain',
					colour: 'Ivory',
					finish: ['Matt', 'Polished', 'Bush Hammered'],
					size: ['9.5x60', '30x60', '60x60', '60x120', '120x120'],
					shape: ['Rectangle', 'Square'],
					traffic: 'Commercial',
					look: 'Plain',
					location: 'Floor',
					imageThumb: './assets/img/M2-0-60A.jpg'
				},
			]
    }
  },

	handleChange: function( event ) {
    this.setState({ query: event.target.value });
  },

  handleCheck: function( event ) {
  	var filterType = event.target.getAttribute('data-filter-type');
    this.setState({ filter: event.target.checked ? event.target.value : "", filterType: filterType });
  },

  
  	// appearances = appearances.filter(
   //      // Feeling lucky? Try swapping these lines:
   //      // () => Math.random() > 0.5
   //      appearances => appearances.colour.toLowerCase().match( filter )
   //    );
 
	
	render: function(){
		var filters = this.props.filters;
		var appearances = this.props.appearances;
		var query = this.state.query.trim().toLowerCase();
		var filter = this.state.filter.trim().toLowerCase();

    // For the next bits of fun, make sure you
    // have typed something into the input!

    if (query.length > 0) {
      appearances = appearances.filter(
        // Feeling lucky? Try swapping these lines:
        // () => Math.random() > 0.5
        appearances => appearances.material.toLowerCase().match(query)
      );
    }

    if (filter.length > 0) {
    	//var filterType = this.state.filterType;

      console.log( 'filter is ' + this.state.filter );
  		console.log( 'filter type ' + this.state.filterType );

  		appearances = appearances.filter(
        // Feeling lucky? Try swapping these lines:
        // () => Math.random() > 0.5
        appearances => appearances.material.toLowerCase().match( filter )
      );
    }

    // var filterList = filters.map(function(filtr){
    // 	var children, list;
    // 	if (filtr.material) {
    // 		filterOptions = filtr.material.map(function(option){
    // 			return (
    // 				<input type='checkbox' value={option} name='material' onChange={this.handleCheck}>
    // 			);
    // 		});

    // 		list = (
    // 			<ul>
    // 				<li>{filterOptions}</li>
    // 			</ul>
    // 		);
    // 	}
    // 	return (
    // 		<h3>Filter option: filter.
    // 	)
    // });
    // You know what to do:
    //return <i>{appearances.map(l => l.material).join(', ')} are friends!</i>;

    return (
      <div>
        <input type='text' // try 'date'
               value={this.state.query/*.toUpperCase()*/}
               onChange={this.handleChange}
               // onMouseEnter={() => this.setState({ query: 'react' })}
               placeholder='Type to search' />

         	{filters.map(filtr =>
	         	<div>
	         		<h2>{filtr.name}</h2>
	         		<ul>
		         		{filtr.options.map(opt =>
		         			<li>
			         			<label for={filtr.name.toLowerCase()}>{opt}</label>
			         			<input type='checkbox' value={opt} name={filtr.name.toLowerCase()} onChange={this.handleCheck} data-filter-type={filtr.name.toLowerCase()} />
		         			</li>
		         		)}
	         		</ul>
	         	</div>
         	)}
        
        <ul>
          {appearances.map(appr =>
          	<li className="media">
						  <div className="media-left media-middle">
						    <a href={appr.url}>
						      <img className="media-object" width="150" height="150" src={appr.imageThumb} alt={appr.pentagonName} />
						    </a>
						  </div>
						  <div className="media-body">
						    <h4 className="media-heading">{appr.colour} - {appr.factoryRange}</h4>
						    <ul>
						    	{appr.material.length > 0 &&
							    <li><b>Material:</b> {appr.material}</li>
							  	}
							    {appr.pentagonName.length > 0 &&
							    <li><b>Pentagon Name:</b> {appr.pentagonName}</li>
							  	}
							    {appr.finish.length > 0 &&
							    	<li>
							    	<b>Finish:</b>
								    	<ul>
									    	{appr.finish.map(finish =>
									    		<li>{finish}</li>
									    	)}
								    	</ul>
							    	</li>
							    }
							    {appr.size.length > 0 &&
							    	<li>
							    	<b>Size:</b>
								    	<ul>
									    	{appr.size.map(size =>
									    		<li>{size}</li>
									    	)}
								    	</ul>
							    	</li>
							    }
							    {appr.shape.length > 0 &&
							    	<li>
							    	<b>Shape:</b>
								    	<ul>
									    	{appr.shape.map(shape =>
									    		<li>{shape}</li>
									    	)}
								    	</ul>
							    	</li>
							    }
							    {appr.traffic.length > 0 &&
							    <li><b>Traffic:</b> {appr.traffic}</li>
							  	}
							  	{appr.look.length > 0 &&
							    <li><b>Look:</b> {appr.look}</li>
							  	}
							  	{appr.location.length > 0 &&
							    <li><b>Location:</b> {appr.location}</li>
							  	}
						    </ul>
						  </div>
						</li>
          )}
        </ul>
        {
        	appearances.length === 0 && <i>Nothing matched your search</i>
        }
      </div>
    );
	}
});

module.exports = Profile;