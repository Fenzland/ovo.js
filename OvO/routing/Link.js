const ROUTER= Symbol( 'router', );
const URL_OBJ= Symbol( 'url_obj', );
const ATTEMPT= Symbol( 'attempt', );

export default class Link extends Function
{
	constructor( router, url, attempt=undefined, )
	{
		super();
		
		this[ROUTER]= router;
		this[URL_OBJ]= new URL( url, window.location, );
		this[ATTEMPT]= attempt;
		
		return new Proxy( this, {
			apply( target, context, args, )
			{
				return target.active();
			}
		}, );
	}
	
	toString()
	{
		return this.url;
	}
	
	get urlObj()
	{
		return this[URL_OBJ];
	}
	
	get url()
	{
		return this[URL_OBJ].href;
	}
	
	get path()
	{
		return this[URL_OBJ].pathname;
	}
	
	get query()
	{
		return this[URL_OBJ].searchParams;
	}
	
	get anchor()
	{
		return this[URL_OBJ].hash;
	}
	
	active()
	{
		return (
			(this[ATTEMPT] && this[ATTEMPT]())
		||
			this[ROUTER].goto( this, )
		)
		
	}
}
