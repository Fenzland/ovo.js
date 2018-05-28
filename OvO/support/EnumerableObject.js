export default class EnumerableObject
{
	map( callback, )
	{
		const $={};
		
		for( let i in this )
			$[i]= callback( i, this[i], );
		
		return $;
	}
	
	mapValues( callback, )
	{
		return Object.entries( this, ).map( ( [ n, f, ] )=> callback( n, f, ), );
	}
	
	forEach( callback, )
	{
		Object.entries( this, ).forEach( ( [ n, f, ] )=> callback( n, f, ), );
	}
	
}
