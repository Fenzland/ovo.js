const CHILDREN= Symbol( 'children', );
const VALUE= Symbol( 'value', );
const LISTENERS= Symbol( 'listeners', );
const ORIGIN= Symbol( 'origin', );

export default class Model
{
	constructor( value, )
	{
		this[CHILDREN]= {};
		this[LISTENERS]= [];
		this[ORIGIN]= this;
		
		if( value instanceof Object )
		{
			for( let key in value )
			{
				this[CHILDREN][key]= new Model( value[key], );
			}
		}
		else
		{
			this[VALUE]= value;
		}
		
		return new Proxy( this, {
			
			get( target, key, receiver, )
			{
				if( target[key] )
					return target[key];
				else
					return target[CHILDREN][key];
			},
			
			set( target, key, value, receiver, )
			{
				if( target[CHILDREN][key] )
					target[CHILDREN][key].setValue( value, );
				else
					target[CHILDREN][key]= new Model( value, );
				return true;
			},
			
		}, );
	}
	
	express( callback, )
	{
		const expression= new Model( callback( this[ORIGIN][VALUE], ), );
		
		this[ORIGIN].listenedBy( value=> expression.setValue( callback( value, ), ) );
		
		return expression;
	}
	
	setValue( value, )
	{
		this[ORIGIN][VALUE]= value;
		
		this[ORIGIN][LISTENERS].forEach( listener=> listener( value, ), );
	}
	
	valueOf()
	{
		return this[ORIGIN][VALUE];
	}
	
	toString()
	{
		return `${this[ORIGIN][VALUE]}`;
	}
	
	listenedBy( listener, )
	{
		this[ORIGIN][LISTENERS].push( listener, );
	}
}
