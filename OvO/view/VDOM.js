import TextNode from './TextNode.js';
import Listener from './Listener.js';
import ITemplate from './ITemplate.js';

const NAME= Symbol( 'name', );
const NAMESPACE= Symbol( 'namespace', );
const CHILDREN= Symbol( 'children', );
const ATTRIBUTES= Symbol( 'attributes', );
const LISTENERS= Symbol( 'listeners', );
const APPEND_LISTENER= Symbol( 'append_listener', );
const EMPTY= Symbol( 'empty', );

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
	
	toString()
	{
		let str= '<'+this[NAME];
		
		for( let [ attr, value, ] of this[ATTRIBUTES] )
			str+= ` ${attr}="${value}"`;
		
		if( this.isEmpty )
			str+= ' />';
		else
		{
			str+= '>';
			str+= this[CHILDREN].join( '', );
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
		
		for( let [ attr, value, ] of this[ATTRIBUTES] )
			dom.setAttribute( attr, value, );
		
		for( let child of this[CHILDREN] )
			dom.appendChild( child.toDOM( document, ), );
		
		for( let listener of this[LISTENERS] )
			listener.listenTo( dom, );
		
		return dom;
	}
	
	empty()
	{
		this[EMPTY]= true;
		
		return this;
	}
	
	get isEmpty()
	{
		return this[EMPTY];
	}
}

export function create( name, ...args )
{
	const vdom= new VDOM( name, );
	
	for( let arg of args )
		if( ITemplate.check( arg, ) )
			vdom.appendChild( arg, );
		else
		if( arg && arg.constructor === Listener )
			vdom[APPEND_LISTENER]( arg, );
		else
		if( arg && arg.constructor === Object )
			for( let attr in arg )
				vdom.setAttribute( attr, arg[attr], );
		else
		if( typeof arg === 'string' || (arg && arg.constructor === String) )
			vdom.appendChild( new TextNode( arg ), );
	
	return vdom;
}

export function createNS( namespace, name, ...args )
{
	const vdom= new VDOM( name, namespace, );
	
	for( let arg of args )
		if( arg instanceof VDOM )
			vdom.appendChild( arg, );
		else
		if( arg && arg.constructor === Listener )
			vdom[APPEND_LISTENER]( arg, );
		else
		if( arg && arg.constructor === Object )
			for( let attr in arg )
				vdom.setAttribute( attr, arg[attr], );
		else
		if( typeof arg === 'string' || (arg && arg.constructor === String) )
			vdom.appendChild( new TextNode( arg ), );
	
	return vdom;
}

export function diff( x, y )
{
	
}
