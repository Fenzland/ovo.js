import { Indicator, ReIndicator, } from './Indicator.js';

const URL= Symbol( 'url', );
const METHOD= Symbol( 'method', );
const LISTENERS= Symbol( 'listeners', );
const DEFAULT_LISTENER= Symbol( 'default_listener', );
const EMIT= Symbol( 'emit', );
const STATUS= Symbol( 'status', );

export default class Link extends Function
{
	constructor( url, method='POST', )
	{
		super();
		
		this[URL]= url;
		this[METHOD]= method;
		this[LISTENERS]= [];
		
		return new Proxy( this, {
			apply( target, context, [ e, ], )
			{
				target.push( context );
				
				return true;
			}
		}, );
	}
	
	push( form, )
	{
		const method= (form.getAttribute( 'method', )||'').toUpperCase() || this[METHOD];
		
		let body;
		switch( form.encoding )
		{
			case 'application/x-www-form-urlencoded':
				body= `${new URLSearchParams( new FormData( form, ), )}`;
			break;
			
			case 'multipart/form-data':
				body= new FormData( form, );
			break;
		}
		
		fetch(
			this[URL],
			{
				method,
				headers: {
					'Content-Type': form.encoding,
				},
				body: body,
			},
		).then( resp=> this[EMIT]( resp, ), );
	}
	
	when( status, callback, )
	{
		const listener= new ReIndicator();
		
		listener[STATUS]= status;
		
		this[LISTENERS].push( listener, );
		
		return listener.then( callback, );
	}
	
	else( callback, )
	{
		const listener= new ReIndicator();
		
		this[DEFAULT_LISTENER]= listener;
		
		return listener.then( callback, );
	}
	
	[EMIT]( resp, )
	{
		for( let listener of this[LISTENERS] )
		{
			if( listener[STATUS]===resp.status )
				return listener.resolve( resp, );
		}
		if( this[DEFAULT_LISTENER] )
			this[DEFAULT_LISTENER].resolve( resp, );
	}
	
	toString()
	{
		return 'javascript:;';
	}
}
