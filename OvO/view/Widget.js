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
		const vdoms= this.render();
		
		if( Array.isArray( vdoms, ) )
			return vdoms.map( x=> x.toHTML(), );
		else
			return vdoms.toHTML();
	}
	
	toDOM( document, )
	{
		const vdoms= this.render();
		
		if( Array.isArray( vdoms, ) )
			return vdoms.map( x=> x.toDOM(), );
		else
			return vdoms.toDOM( document, );
	}
}
