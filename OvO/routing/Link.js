const ROUTE= Symbol( 'route', );
const URL= Symbol( 'url', );

export default class Link
{
	constructor( route, url, )
	{
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
		this[ROUTE].router.goto( this, );
	}
}
