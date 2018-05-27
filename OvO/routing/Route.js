import Link from './Link.js';
import Gate from './Gate.js';

const NAME= Symbol( 'name', );
const PATTERN= Symbol( 'pattern', );
const PAGE= Symbol( 'page', );
const GATES= Symbol( 'gates', );

export default class Route
{
	/**
	 * @param String name
	 * @param String pattern
	 * @param String page
	 */
	constructor( name, pattern, page, )
	{
		this[NAME]= name;
		this[PATTERN]= pattern;
		this[PAGE]= page;
		this[GATES]= [];
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
	
	gatedBy( gate, )
	{
		if(!( gate instanceof Gate ))
			throw 'route must be gated by a gate.'
		
		this[GATES].push( gate, );
		
		return this;
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
	
	get name()
	{
		return this[NAME];
	}
	
	get page()
	{
		return this[PAGE];
	}
	
	get gates()
	{
		return this[GATES];
	}
}
