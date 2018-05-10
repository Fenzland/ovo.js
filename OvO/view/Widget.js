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
	
	toHTML()
	{
		return this.render().toHTML();
	}
	
	toDOM( document, )
	{
		return this.render().toDOM( document, );
	}
}
