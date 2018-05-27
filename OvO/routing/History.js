import session from '../support/session.js';

const SESSION= Symbol( 'session', );
const LOAD_FROM_SESSION= Symbol( 'load_from_session', );
const HEAD= Symbol( 'head', );
const STATES= Symbol( 'states', );
const URL= Symbol( 'url', );
const ROUTE_NAME= Symbol( 'route_name', );

export default class History
{
	constructor()
	{
		this[SESSION]= session( 'history', );
		
		if( this[SESSION].has( 'history', ) )
			this[LOAD_FROM_SESSION]();
		
		this[STATES]= [];
	}
	
	push( state, )
	{
		if( this[HEAD] )
			state[HEAD]= this[HEAD];
		
		this[HEAD]= state;
		
		this[STATES].push( state, );
	}
	
	moveTo( state, )
	{
		
	}
	
	match( routeName, index=0, )
	{
		let head= this[HEAD];
		
		while( index<0 && head )
		{
			head= head[HEAD];
			
			++index;
		}
		
		return head && head[ROUTE_NAME]===routeName;
	}
	
	[LOAD_FROM_SESSION]()
	{
		const fromSession= this[SESSION].get( 'history', );
		
		fromSession.forEach()
	}
}

export class State
{
	constructor( url, routeName, )
	{
		this[URL]= url;
		this[ROUTE_NAME]= routeName;
	}
	
	toString()
	{
		return this.url;
	}
	
	get url()
	{
		return this[URL];
	}
	
	get routeName()
	{
		return this[ROUTE_NAME];
	}
}
