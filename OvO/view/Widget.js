export default class Widget
{
	constructor( { name, render, template, }, )
	{
		this.name= name;
		this.renderMethod= render;
		this.template= template;
	}
	
	render()
	{
		return this.renderMethod();
	}
	
	toString()
	{
		return this.render().toString();
	}
	
	toDOM( document, )
	{
		return this.render().toDOM( document, );
	}
}
