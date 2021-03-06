const NATIVE_STORAGE= Symbol( 'native_storage', );
const WRAP_KEY= Symbol( 'wrap_key', );
const PREFIX= Symbol( 'prefix', );
const OWNS_KEY= Symbol( 'owns_key', );

export default class Storage
{
	constructor( native_storage, prefix, )
	{
		this[PREFIX]= `☰${prefix}☷`;
		this[NATIVE_STORAGE]= native_storage;
	}
	
	set( key, value, )
	{
		this[NATIVE_STORAGE].setItem( this[WRAP_KEY]( key, ), JSON.stringify( value, ), );
		
		return value;
	}
	
	get( key, defaults=null, )
	{
		const json= this[NATIVE_STORAGE].getItem( this[WRAP_KEY]( key, ), );
		
		return (json? JSON.parse( json, ) : defaults);
	}
	
	has( key, )
	{
		const json= this[NATIVE_STORAGE].getItem( this[WRAP_KEY]( key, ), );
		
		return json!=null;
	}
	
	achieve( key, fallback, )
	{
		const json= this[NATIVE_STORAGE].getItem( this[WRAP_KEY]( key, ), );
		
		if( json!=null )
			return JSON.parse( json, );
		
		if( fallback instanceof Function )
			fallback= fallback();
		
		return this.set( key, fallback, );
	}
	
	del( key, )
	{
		this[NATIVE_STORAGE].removeItem( this[WRAP_KEY]( key, ), );
	}
	
	clear()
	{
		for( let i= this[NATIVE_STORAGE].length-1; i>=0; --i )
		{
			let key= this[NATIVE_STORAGE].key( i, );

			if( this[OWNS_KEY]( key, ) )
				this[NATIVE_STORAGE].removeItem( key, );
		}
	}
	
	[WRAP_KEY]( key, )
	{
		return `${this[PREFIX]}${key}`;
	}
	
	[OWNS_KEY]( key, )
	{
		return `${key}`.slice( 0, this[PREFIX].length, ) === this[PREFIX];
	}
}
