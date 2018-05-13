const CHILDREN= Symbol( 'children', );
const VALUE= Symbol( 'value', );
const LISTENERS= Symbol( 'listeners', );
const SET_VALUE= Symbol( 'set_value', );
const ORIGIN= Symbol( 'origin', );
const IS_ARRAY= Symbol( 'is_array', );
const ASSIGN_TO= Symbol( 'assign_to', );

export default class Model
{
	constructor( value, )
	{
		this[CHILDREN]= {};
		this[LISTENERS]= [];
		this[ORIGIN]= this;
		
		if( Array.isArray( value, ) )
		{
			setAsArrayModel( this, );
			
			this[CHILDREN]= value.map( x=> new Model( x, ), );
		}
		else
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
			this[SET_VALUE]( value, );
		}
	}
	
	[SET_VALUE]( value, )
	{
		if( value === this[ORIGIN][VALUE] ) return;
		
		const originValue= this[ORIGIN][VALUE];
		
		this[ORIGIN][VALUE]= value;
		
		this[ORIGIN][LISTENERS].forEach( listener=> listener( value, originValue, ), );
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
	
	get isArray()
	{
		return this[IS_ARRAY]||false;
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

export class ArrayModel extends Model
{
	constructor( value, )
	{
		super( value, );
	}
	
	map( ...args )
	{
		return this[ORIGIN][CHILDREN].concat().map( ...args, );
	}
	
	reduce( ...args )
	{
		return this[ORIGIN][CHILDREN].concat().reduce( ...args, );
	}
	
	push( ...children )
	{
		this[SET_VALUE]( this[ORIGIN][CHILDREN].concat( children, ), );
	}
	
	[SET_VALUE]( value, )
	{
		if(!( Array.isArray( value, ) ))
			throw 'The value of ArrayModel must be as array.';
		
		const CALL= ( index, model, )=> {
			this[ORIGIN][LISTENERS].forEach( listener=> listener( index, model, ), );
			
			return model;
		}
		
		let i= 0, j= 0, k= 0;
		while( i < this[ORIGIN][CHILDREN].length )
			if( j >= value.length )
				this[ORIGIN][CHILDREN].splice( i, ).forEach( ()=> CALL( i, null, ), );
			else
			if( this[ORIGIN][CHILDREN][i] === value[j] )
				++i, ++j;
			else
			if( 0 <= (k= value.indexOf( this[ORIGIN][CHILDREN][i], j, )) )
			{
				this[ORIGIN][CHILDREN].splice( i, 0, ...value.slice( j, k, ).map( ( x, ii, )=> CALL( i- -ii, new Model( x, ), ), ), );
				i-= j - 1 - k;
				j= k - - 1;
			}
			else
				this[ORIGIN][CHILDREN].splice( i, 1, ),  CALL( i, null, );
		if( j < value.length )
			this[ORIGIN][CHILDREN].splice( i, 0, ...value.slice( j, ).map( ( x, ii )=> CALL( i- -ii, new Model( x, ), ), ), );
	}
}

function setAsArrayModel( model, )
{
	Object.setPrototypeOf( model, ArrayModel.prototype, );
	
	Object.constructor= ArrayModel;
}
