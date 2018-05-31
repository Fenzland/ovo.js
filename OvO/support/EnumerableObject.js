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
		return Object.entries( this, ).map( ( [ n, v, ] )=> callback( n, v, ), );
	}
	
	forEach( callback, )
	{
		Object.entries( this, ).forEach( ( [ n, v, ] )=> callback( n, v, ), );
	}
	
	static map( object, callback, )
	{
		const $={};
		
		for( let i in object )
			$[i]= callback( i, object[i], );
		
		return $;
	}
	
	static mapValues( object, callback, )
	{
		return Object.entries( object, ).map( ( [ n, v, ] )=> callback( n, v, ), );
	}
	
	static forEach( object, callback, )
	{
		Object.entries( object, ).forEach( ( [ n, v, ] )=> callback( n, v, ), );
	}
	
}
