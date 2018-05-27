import { create, forEach, } from './VDOM.js'
import { escapeFree as ef, } from './TextNode.js'
// import customElements from 'customElements';

const NAME= Symbol( 'name', );
const TEMPLATE= Symbol( 'template', );
const MAKE_ELEMENT_CLASS= Symbol( 'make_element_class', );
const ELEMENT_CLASS= Symbol( 'element_class', );
const SHADOW= Symbol( 'shadow', );
const SET_VSHADOW= Symbol( 'set_vshadow', );

export default class Component extends Function
{
	constructor( { name, template, styles, isEmpty, } )
	{
		super();
		
		Component.checkName( name, true, );
		
		if( Component.exists( name, ) )
			throw `Component named "${name}" is already defineed.`;
		
		this[NAME]= name;
		this[TEMPLATE]= template;
		
		customElements.define( name, this.elementClass );
		
		return new Proxy( this, {
			
			apply( target, context, args, )
			{
				const vShadow= template( ...args, );
				const vdom= create( name, );
				
				vdom.addDOMProcessor( dom=> dom[SET_VSHADOW]( create( 'style', ef( styles, ), ), vShadow, ), );
				
				if( isEmpty )
					vdom.empty();
				
				return vdom;
			},
			
		}, );
	}
	
	get elementClass()
	{
		return this[ELEMENT_CLASS] || (
			this[ELEMENT_CLASS]= this[MAKE_ELEMENT_CLASS]()
		);
	}
	
	[MAKE_ELEMENT_CLASS]()
	{
		return class extends HTMLElement
		{
			constructor()
			{
				super();
				
				this[SHADOW]= this.attachShadow( { mode: 'open', }, );
			}
			
			[SET_VSHADOW]( ...vdoms )
			{
				forEach(
					vdoms,
					x=> x.toDOM( document, ).forEach(
						x=> this[SHADOW].appendChild( x, ),
					),
				);
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
