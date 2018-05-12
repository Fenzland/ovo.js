import VDOM from './VDOM.js';
import TextNode from './TextNode.js';

const MODEL= Symbol( 'model', );
const VDOMS= Symbol( 'vdoms', );
const DOMS= Symbol( 'doms', );
const ACTIVED_DOMS= Symbol( 'get_doms', );
const GET_DOMS= Symbol( 'get_doms', );
const SWITCH= Symbol( 'switch', );

export default class Ctrl
{
	constructor()
	{
		
	}
};

class IfCtrl extends Ctrl
{
	constructor( model, )
	{
		super();
		
		this[MODEL]= model;
		
		model.listenedBy( ( v, o, )=>{
			if( !!v ^ !!o )
				this[SWITCH]( +!!v, );
		}, );
		
		this[DOMS]= {};
		this[VDOMS]= {
			1: [ new TextNode( '', ), ],
			0: [ new TextNode( '', ), ],
		};
	}
	
	then( ...args )
	{
		this[VDOMS][1]= VDOM.create( '', ...args, ).children;
		
		return this;
	}
	
	else( ...args )
	{
		this[VDOMS][0]= VDOM.create( '', ...args, ).children;
		
		return this;
	}
	
	toHTML()
	{
		return this[ACTIVED_VDOMS].map( x=> x.toHTML(), ).join( '', );
	}
	
	toDOM( document, )
	{
		return this[ACTIVED_DOMS]= this[GET_DOMS]( this.value, );
	}
	
	get value()
	{
		return +!!this[MODEL].valueOf();
	}
	
	[GET_DOMS]( value, )
	{
		if( this[DOMS][value] )
			return this[DOMS][value];
		else
			return this[DOMS][value]= this[VDOMS][value].map( x=> x.toDOM( document, ), );
		
	}
	
	[SWITCH]( value, )
	{
		// not render yet
		if(!( this[ACTIVED_DOMS] )) return;
		
		const doms= this[GET_DOMS]( value, );
		const originDoms= this[ACTIVED_DOMS];
		
		if( originDoms === doms ) return;
		
		this[ACTIVED_DOMS][0].replaceWith( ...doms, )
		
		this[ACTIVED_DOMS].slice( 1, ).forEach( x=> x.remove(), );
		
		this[ACTIVED_DOMS]= doms;
	}
}

export function If( model, )
{
	return new IfCtrl( model, );
}

export function IfNot( model, )
{
	
}

export function For( model, )
{
	
}
