import TextNode from './TextNode.js';
import Listener from './Listener.js';
import ITemplate from './ITemplate.js';
import Model from '../model/Model.js';

const NAME= Symbol( 'name', );
const NAMESPACE= Symbol( 'namespace', );
const CHILDREN= Symbol( 'children', );
const ATTRIBUTES= Symbol( 'attributes', );
const LISTENERS= Symbol( 'listeners', );
const SET_ATTRIBUTE= Symbol( 'set_attribute', );
const APPEND_LISTENER= Symbol( 'append_listener', );
const DOM_PROCESSOR= Symbol( 'dom_processor', );
const EMPTY= Symbol( 'empty', );
const DOM= Symbol( 'dom', );

export default class VDOM
{
	constructor( name, namespace=undefined, )
	{
		this[NAME]= name;
		this[NAMESPACE]= namespace;
		this[CHILDREN]= [];
		this[ATTRIBUTES]= new Map;
		this[LISTENERS]= [];
		this[EMPTY]= false;
	}
	
	fill( ...args )
	{
		for( let arg of args )
			// Array: fill each
			if( Array.isArray( arg, ) )
				this.fill( ...arg, );
			else
			// ITemplate: as a child
			if( ITemplate.check( arg, ) )
				this.appendChild( arg, );
			else
			// Listener: listen
			if( arg && arg.constructor === Listener )
				this[APPEND_LISTENER]( arg, );
			else
			// Plant Object: as attributes
			if( arg && arg.constructor === Object )
				for( let attr in arg )
					this.setAttribute( attr, arg[attr], );
			else
			// String: make a TextNode as a child
			if( typeof arg === 'string' || (arg && arg.constructor === String) )
				this.appendChild( new TextNode( arg, ), );
			else
			// Model: treat as a String
			if( arg instanceof Model )
				this.appendChild( new TextNode( arg, ), );
			else
			// other: convert to a String
			if( arg || !isNaN( arg, ) )
				this.appendChild( new TextNode( `${arg}`, ), );
		
		return this;
	}
	
	appendChild( child, )
	{
		this[CHILDREN].push( child, );
	}
	
	setNamespace( namespace, )
	{
		this[NAMESPACE]= namespace;
	}
	
	setAttribute( attr, value=undefined, )
	{
		if( value instanceof Model )
		{
			this[SET_ATTRIBUTE]( attr, value.valueOf(), );
			value.listenedBy( v=> this[SET_ATTRIBUTE]( attr, v, ), );
		}
		else
			this[SET_ATTRIBUTE]( attr, value, );
	}
	
	getAttribute( attr, )
	{
		return this[ATTRIBUTES].get( attr, );
	}
	
	addDOMProcessor( processor, )
	{
		this[DOM_PROCESSOR]= processor;
	}
	
	addListener( eventName, callback, )
	{
		this[APPEND_LISTENER]( new Listener( eventName, callback, ), )
	}
	
	[SET_ATTRIBUTE]( attr, value, )
	{
		if( value === undefined )
			value= attr;
		
		this[ATTRIBUTES].set( attr, value, );
		
		if( this[DOM] )
			this[DOM].setAttribute( attr, value, );
	}
	
	[APPEND_LISTENER]( listener, )
	{
		this[LISTENERS].push( listener, );
	}
	
	toHTML()
	{
		let str= '<'+this[NAME];
		
		for( let [ attr, value, ] of this[ATTRIBUTES] )
			str+= ` ${attr}="${value}"`;
		
		if( this.isEmpty )
			str+= ' />';
		else
		{
			str+= '>';
			str+= this[CHILDREN].map( x=> x.toHTML() ).join( '', );
			str+= `</${this[NAME]}>`;
		}
		
		return str;
	}
	
	toDOM( document, )
	{
		const dom= (
			this[NAMESPACE]
			? document.createElementNS( this[NAMESPACE], this[NAME])
			: document.createElement( this[NAME], )
		);
		
		this[DOM]= dom;
		
		for( let [ attr, value, ] of this[ATTRIBUTES] )
			dom.setAttribute( attr, value, );
		
		for( let listener of this[LISTENERS] )
			listener.listenTo( dom, );
		
		for( let child of this[CHILDREN] )
			for( let childDom of child.toDOM( document, ) )
				dom.appendChild( childDom, );
		
		if( this[DOM_PROCESSOR] )
			this[DOM_PROCESSOR]( dom, );
		
		return [ dom, ];
	}
	
	empty()
	{
		this[EMPTY]= true;
		
		return this;
	}
	
	get children()
	{
		return this[CHILDREN];
	}
	
	get isEmpty()
	{
		return this[EMPTY];
	}
	
	static create( name, ...args )
	{
		return new VDOM( name, ).fill( ...args, );
	}
	
	static createNS( namespace, name, ...args )
	{
		return new VDOM( name, namespace, ).fill( ...args, );
	}
	
	static forEach( vdoms, callback, )
	{
		if( Array.isArray( vdoms, ) )
			VDOM.create( '', ...vdoms ).children.forEach( x=> callback( x, ), );
		else
			callback( vdoms, );
	}
	
	static diff( x, y, )
	{
		
	}
}

export const create= VDOM.create;
export const createNS= VDOM.createNS;
export const forEach= VDOM.forEach;
export const diff= VDOM.diff;
