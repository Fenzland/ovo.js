import Query from '../support/Query.js';

export default class Page
{
	constructor( { name, render, template, }, )
	{
		this.name= name;
		this.renderMethod= render;
		this.template= template;
	}
	
	render( params, query, anchor, )
	{
		query= Query.parse( query, );
		
		// TODO
		// return this.template;
		return this.renderMethod();
	}
}
