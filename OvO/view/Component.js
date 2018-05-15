// import customElements from 'customElements';

const TEMPLATE= Symbol( 'template', );
const MAKE_ELEMENT_CLASS= Symbol( 'make_element_class', );
const ELEMENT_CLASS= Symbol( 'element_class', );

export default class Component extends Function
{
	constructor( name, template, )
	{
		Component.checkName( name, true, );
		
		if( Component.exists( name, ) )
			throw `Component named "${name}" is already defineed.`;
		
		this[TEMPLATE]= template;
		
		customElements.define( name, this.elementClass )
		
		return new Proxy( this, {
			
			apply( ...args )
			{
				;
			}
			
		}, );
	}
	
	get elementClass()
	{
		return this[ELEMENT_CLASS] || (
			this[ELEMENT_CLASS]= this[MAKE_ELEMENT_CLASS]
		)
	}
	
	[MAKE_ELEMENT_CLASS]()
	{
		const component= this;
		
		return class extends HTML
		{
			constructor()
			{
				super();
				
				const shadow= this.attachShadow( { mode: 'open', }, );
				const vdom= component[TEMPLATE]
				component
			}
		}
	}
	
	static checkName( name, throws=false, )
	{
		if(!( /[a-z][a-z0-9]*-[a-z][a-z0-9]*/.test( name, ) ))
			if( throws )
				throw `Component name "${name}" is invalid.`;
			else
				return false;
		else
			return true;
	}
	
	static exists( name, )
	{
		return !!customElements.get( name, );
	}
}
