import Query from '../support/Query.js';

export default class Page
{
	constructor( { name, render, template, }, )
	{
		this.name= name;
		this.renderMethod= render;
		this.template= template;
	}
	
	render( params, queries, anchor, )
	{
		queries= Query.parse( queries, );
		
		if( '#' === anchor.slice( 0, 1, ) )
			anchor= anchor.slice( 1, );
		
		return this.renderMethod( { params, queries, anchor, }, );
	}
}
