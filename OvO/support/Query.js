import Pointer from './Pointer.js';

export function parse( string, )
{
	if( 0===string.indexOf( '?', ) )
		string= string.slice( 1, );
	
	if(!( string ))
		return {};
	
	const items= string.split( '&', ).map( item=> item.split( '=', ).slice( 0, 2, ).map( decodeURIComponent, ), );
	
	const params= {};
	
	for( let [ key, value, ] of items )
	{
		const keys= key.replace( ']', '', ).split( '[', );
		const pointer= new Pointer( params, );
		
		for( let key of keys )
		{
			if( key === '' )
				key= increasedIndex( pointer.base, );
			
			pointer.pointToMember( key, );
		}
		
		pointer.value= value;
	}
	
	return params;
}

export function build( params )
{
	
}

export const Query= {
	parse,
	build,
};

export default Query

function increasedIndex( object )
{
	let index= -1;
	
	for( let key in object )
		if( !isNaN( key ) && key>index )
			index= key;
	
	return ++index;
}
