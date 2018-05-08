import session from '../support/session.js';

const SESSION= Symbol( 'session', );
const LOAD_FROM_SESSION= Symbol( 'load_from_session', );
const HEAD= Symbol( 'head', );
const URL= Symbol( 'url', );

export default class History
{
	constructor()
	{
		this[SESSION]= session( 'history', );
		
		if( this[SESSION].has( 'history', ) )
			this[LOAD_FROM_SESSION]();
	}
	
	push( state, )
	{
		if( this[HEAD] )
			state[HEAD]= this[HEAD];
		
		this[HEAD]= state;
	}
	
	moveTo( state, )
	{
		
	}
	
	[LOAD_FROM_SESSION]()
	{
		const fromSession= this[SESSION].get( 'history', );
		
		fromSession.forEach()
	}
}

export class State
{
	constructor( url, )
	{
		this[URL]= url;
	}
	
	toString()
	{
		return this.url;
	}
	
	get url()
	{
		return this[URL];
	}
}
