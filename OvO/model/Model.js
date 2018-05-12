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
	
	setValue( value, )
	{
		if( value instanceof Promise )
		{
			if( value.temp !== undefined )
				this[ORIGIN].setValue( value.temp, );
			
			value.then(
				x=> this[ORIGIN].setValue( x, ),
				e=> {
					this[ORIGIN].setValue( value.rejected, );
					throw e;
				},
			);
		}
		else
		{
			const originValue= this[ORIGIN][VALUE];
			
			this[ORIGIN][VALUE]= value;
			
			this[ORIGIN][LISTENERS].forEach( listener=> listener( value, originValue, ), );
		}
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
	
	express( callback, )
	{
		return Model.express( callback, this, );
		const expression= new Model( callback( this[ORIGIN][VALUE], ), );
		
		this[ORIGIN].listenedBy( value=> expression.setValue( callback( value, ), ) );
		
		return expression;
	}
	
	static express( callback, ...models )
	{
		const expression= new Model( callback( ...models.map( x=>x.valueOf(), ), ), );
		
		models.forEach(
			model=> model.listenedBy( ()=> expression.setValue( callback( ...models.map( x=>x.valueOf(), ), ), ) ),
		);
		
		return expression;
	}
}
