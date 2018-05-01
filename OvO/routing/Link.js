const ROUTER= Symbol( 'router', );
const ROUTE= Symbol( 'route', );
const URL= Symbol( 'url', );

export default class Link
{
	constructor( router, route, url, )
	{
		this[ROUTER]= router;
		this[ROUTE]= route;
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
	
	active()
	{
		this[ROUTER].goto( this, );
	}
}
