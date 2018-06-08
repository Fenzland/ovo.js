import { ReIndicator, } from './Indicator.js';

const URL= Symbol( 'url', );
const METHOD= Symbol( 'method', );
const LISTENERS= Symbol( 'listeners', );
const DEFAULT_LISTENER= Symbol( 'default_listener', );
const EMIT= Symbol( 'emit', );
const STATUS= Symbol( 'status', );

export default class Request extends Function
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
				target.request( context ).then( resp=> target[EMIT]( resp, ), );
				
				return true;
			}
		}, );
	}
	
	request( body, headers={}, )
	{
		return fetch(
			this[URL],
			{
				method: this[METHOD],
				headers,
				body: body,
				credentials: 'same-origin',
			},
		);
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
	
	get url()
	{
		return this[URL];
	}
	
	get method()
	{
		return this[METHOD];
	}
	
	toString()
	{
		return 'javascript:;';
	}
}
