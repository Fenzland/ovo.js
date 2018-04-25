export default class Page
{
	constructor( { name, render, template, }, )
	{
		this.name= name;
		this.renderMethod= render;
		this.template= template;
	}
	
	render( params, )
	{
		// TODO
		return this.template;
	}
}
