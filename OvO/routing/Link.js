const ROUTER= Symbol( 'router', );
const ROUTE= Symbol( 'route', );
const URL= Symbol( 'url', );

export default class Link extends Function
{
	constructor( router, route, url, )
	{
		super();
		
		this[ROUTER]= router;
		this[ROUTE]= route;
		this[URL]= url;
		
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
	
	get url()
	{
		return this[URL];
	}
	
	active()
	{
		return this[ROUTER].goto( this, );
	}
}
