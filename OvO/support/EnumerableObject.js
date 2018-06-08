export default class EnumerableObject
{
	map( callback, )
	{
		return this.constructor.map( this, callback, );
	}
	
	mapValues( callback, )
	{
		return this.constructor.mapValues( this, callback, );
	}
	
	forEach( callback, )
	{
		return this.constructor.forEach( this, callback, );
	}
	
	toString()
	{
		return JSON.stringify( this, );
	}
	
	static map( object, callback, )
	{
		const $= new this;
		
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

export const map= EnumerableObject.map.bind( EnumerableObject, );
export const mapValues= EnumerableObject.mapValues.bind( EnumerableObject, );
export const forEach= EnumerableObject.forEach.bind( EnumerableObject, );
