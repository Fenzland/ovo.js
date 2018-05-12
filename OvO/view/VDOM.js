import TextNode from './TextNode.js';
import Listener from './Listener.js';
import ITemplate from './ITemplate.js';
import Model from '../model/Model.js';

const NAME= Symbol( 'name', );
const NAMESPACE= Symbol( 'namespace', );
const CHILDREN= Symbol( 'children', );
const ATTRIBUTES= Symbol( 'attributes', );
const LISTENERS= Symbol( 'listeners', );
const APPEND_LISTENER= Symbol( 'append_listener', );
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
			if( arg && arg.constructor === Model )
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
		if( value === undefined )
			value= attr;
		
		this[ATTRIBUTES].set( attr, value, );
	}
	
	getAttribute( attr, )
	{
		return this[ATTRIBUTES].get( attr, );
	}
	
	addListener( eventName, callback, )
	{
		this[APPEND_LISTENER]( new Listener( eventName, callback, ), )
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
		{
			const childDoms= child.toDOM( document, );
			
			if( Array.isArray( childDoms, ) )
				for( let childDom of childDoms )
					dom.appendChild( childDom, );
			else
				dom.appendChild( childDoms, );
		}
		
		return dom;
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
	
	static diff( x, y, )
	{
		
	}
}

export const create= VDOM.create;
export const createNS= VDOM.createNS;
export const diff= VDOM.diff;
