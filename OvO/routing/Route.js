import Link from './Link.js';
import Gate from './Gate.js';

const NAME= Symbol( 'name', );
const ATTRIBUTES= Symbol( 'attributes', );
const PATTERN= Symbol( 'pattern', );
const REG_PATTERN= Symbol( 'reg_pattern', );
const PAGE= Symbol( 'page', );
const GATES= Symbol( 'gates', );

const typesReg= {
	Int: '\\d+',
	Num: '\\d+(?:.\\d+)?',
	Wrd: '\\w+',
	Alf: '\\a+',
};

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
		[ this[REG_PATTERN], this[ATTRIBUTES], ]= parsePattern( pattern, );
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
		const matches= this[REG_PATTERN].exec( path, );
		
		if(!( matches ))
			return false;
		
		const params= {};
		
		this[ATTRIBUTES].forEach( attr=> params[attr.name]= conversionType( matches.groups[attr.name]||null, attr.type, ), );
		
		return params;
	}
	
	makePath( param, )
	{
		return this[PATTERN].replace( /\{(\w+)(?:\:(\w+))?\}/g, ( replaced, name, )=> param[name]||'', );
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
		return new Link( router, this, this.makePath( params, ), );
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

function parsePattern( pattern, )
{
	const attributes= [];
	
	const regPattern= new RegExp(
		'^'
	+
		pattern.replace(
			/\{(\w+)(?:\:(\w+))?\}/g,
			( replaced, name, type='Any', )=> (
				attributes.push( { name, type, }, )
			,
				`(?<${name}>${(type?typesReg[type]:null)||'[^\\/]+?'})`
			),
		)
	+
		'$',
	);
	
	return [ regPattern, attributes, ];
}

function conversionType( value, type, )
{
	if( type === 'Int' || type === 'Num' )
		return +value;
	else
		return `${value}`;
}
