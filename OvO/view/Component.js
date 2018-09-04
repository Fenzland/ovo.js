import { create, forEach, arrangeArgs, } from './VDOM.js'
import { escapeFree as ef, } from './TextNode.js'

const customElements= window.customElements;

const NAME= Symbol( 'name', );
const MAKE_ELEMENT_CLASS= Symbol( 'make_element_class', );
const ELEMENT_CLASS= Symbol( 'element_class', );
const SHADOW= Symbol( 'shadow', );
const SET_VSHADOW= Symbol( 'set_vshadow', );

export default class Component extends Function
{
	constructor( { name, render, styles, isEmpty, }, )
	{
		super();
		
		Component.checkName( name, true, );
		
		if( Component.exists( name, ) )
			throw new Error( `Component named "${name}" is already defineed.`, );
		
		this[NAME]= name;
		this[ELEMENT_CLASS]= this[MAKE_ELEMENT_CLASS]();
		
		customElements.define( name, this[ELEMENT_CLASS], );
		
		return new Proxy( this, {
			
			apply( target, context, args, )
			{
				const vShadow= render( arrangeArgs( args, ), );
				const vdom= create( name, );
				
				if( isEmpty )
					vdom.empty();
				
				vdom.addDOMProcessor( dom=> dom[SET_VSHADOW]( create( 'style', ef( styles, ), ), vShadow, ), );
				
				return vdom;
			},
			
		}, );
	}
	
	get name()
	{
		return this[NAME];
	}
	
	get elementClass()
	{
		return this[ELEMENT_CLASS];
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
