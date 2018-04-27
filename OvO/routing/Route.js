import Link from './Link.js';

const ROUTER= Symbol( 'router', );
const PATTERN= Symbol( 'pattern', );
const PAGE= Symbol( 'page', );

export default class Route
{
	constructor( router, pattern, page, )
	{
		this[ROUTER]= router;
		this[PATTERN]= pattern;
		this[PAGE]= page;
	}
	
	match( path, )
	{
		return path===this[PATTERN];
	}
	
	link( params, )
	{
		return new Link( this, this[PATTERN], );
	}
	
	get page()
	{
		return this[PAGE];
	}
	
	get router()
	{
		return this[ROUTER];
	}
}
