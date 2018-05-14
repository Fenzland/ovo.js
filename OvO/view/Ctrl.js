import VDOM from './VDOM.js';
import TextNode from './TextNode.js';
import Model, { ArrayModel, } from '../model/Model.js';

const MODEL= Symbol( 'model', );
const VDOMS= Symbol( 'vdoms', );
const DOMS= Symbol( 'doms', );
const ACTIVED_DOMS= Symbol( 'get_doms', );
const GET_DOMS= Symbol( 'get_doms', );
const UPDATE= Symbol( 'update', );
const TEMPLATE= Symbol( 'template', );
const MAKE_ROW= Symbol( 'make_row', );
const DOCUMENT= Symbol( 'document', );
const ROW_CACHE= Symbol( 'row_cache', );

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
				this[UPDATE]( +!!v, );
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
		return this[VDOMS][this.value].map( x=> x.toHTML(), ).join( '', );
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
	
	[UPDATE]( value, )
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
	return new IfCtrl( model.express( x=> !x, ) );
}

class ForEachCtrl extends Ctrl
{
	constructor( model, template, )
	{
		super();
		
		if(!( model instanceof ArrayModel ))
			throw 'The model for ForEach must be an ArrayModel.';
		
		if(!( 'function' === typeof template ))
			throw 'The template for ForEach must be a Function.';
		
		this[MODEL]= model;
		
		model.listenedBy( ( i, model, )=> this[UPDATE]( i, model, ), );
		
		this[TEMPLATE]= template;
		this[ROW_CACHE]= new WeakMap;
	}
	
	toHTML()
	{
		return this[MODEL].map(
			x=> this[MAKE_ROW]( x, ).map( x=> x.toHTML(), ).join( '', ),
		).join( '', );
	}
	
	toDOM( document, )
	{
		this[DOCUMENT]= document;
		this[ACTIVED_DOMS]= this[MODEL].map(
			x=> {
				const doms= this[MAKE_ROW]( x, ).map( x=> x.toDOM( document, ), );
				
				if(!( doms.length ))
					doms.push( new TextNode( '', ), );
				
				return doms;
			},
		).concat( [ [ new Text( '', ), ], ], );
		
		return this[ACTIVED_DOMS].reduce( ( x, y, )=> x.concat( y, ), [], );
	}
	
	[MAKE_ROW]( x, )
	{
		let row= this[ROW_CACHE].get( x, );
		
		if(!( row ))
		{
			row= VDOM.create( '', this[TEMPLATE]( x, ), ).children;
			
			this[ROW_CACHE].set( x, row, );
		}
		
		return row;
	}
	
	[UPDATE]( i, model, )
	{
		if(!( this[ACTIVED_DOMS] )) return;
		
		if( model )
		{
			const vdoms= this[MAKE_ROW]( model, );
			const doms= vdoms.map( x=> x.toDOM( this[DOCUMENT], ), )
			
			this[ACTIVED_DOMS][i][0].before( ...doms, );
			
			this[ACTIVED_DOMS].splice( i, 0, doms, );
		}
		else
			this[ACTIVED_DOMS].splice( i, 1, )[0].forEach( x=> x.remove(), );
	}
}

export function ForEach( model, template, )
{
	return new ForEachCtrl( model, template, );
}
