import Link from './Link.js';

const PATTERN= Symbol( 'pattern', );
const PAGE= Symbol( 'page', );

export default class Route
{
	/**
	 * @param String pattern
	 * @param String page
	 */
	constructor( pattern, page, )
	{
		this[PATTERN]= pattern;
		this[PAGE]= page;
	}
	
	/**
	 * Chack if the path matches to this route.
	 * 
	 * @param String path
	 * 
	 * @return Boolean
	 */
	match( path, )
	{
		return path===this[PATTERN];
	}
	
	/**
	 * Build a link.
	 * 
	 * @param Router router
	 * @param Object params
	 * 
	 * @return Link
	 */
	link( router, params, )
	{
		return new Link( router, this, this[PATTERN], );
	}
	
	get page()
	{
		return this[PAGE];
	}
}
