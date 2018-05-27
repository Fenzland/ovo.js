const CHILDREN= Symbol( 'children', );
const VALUE= Symbol( 'value', );
const LISTENERS= Symbol( 'listeners', );
const SET_VALUE= Symbol( 'set_value', );
const ORIGIN= Symbol( 'origin', );
const IS_ARRAY= Symbol( 'is_array', );
const LENGTH= Symbol( 'length', );
const EMIT= Symbol( 'emit', );

export default class Model
{
	constructor( value, )
	{
		if( value instanceof Model ) return value;
		
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
				if( typeof key === 'symbol' )
				{
					target[key]= value;
					return true;
				}
				
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
		if( value instanceof Function )
		{
			this[SET_VALUE]( value(), );
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
	
	[Symbol.toPrimitive]( hint, )
	{
		switch( hint )
		{
			case "number":
				return +this[ORIGIN][VALUE];
			case "string":
				return this.toString();
			case "default":
			default:
				return this[ORIGIN][VALUE];
		}
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
		super( [], );
		
		this.setValue( value, );
	}
	
	map( ...args )
	{
		return this[ORIGIN][CHILDREN].map( ...args, );
	}
	
	forEach( ...args )
	{
		return this[ORIGIN][CHILDREN].forEach( ...args, );
	}
	
	reduce( ...args )
	{
		return this[ORIGIN][CHILDREN].reduce( ...args, );
	}
	
	entries()
	{
		return this[ORIGIN][CHILDREN].entries();
	}
	
	*[Symbol.iterator]()
	{
		for( let x of this[ORIGIN][CHILDREN] )
			yield x;
	}
	
	push( ...children )
	{
		this[ORIGIN][CHILDREN].push( ...children.map( x=> this[EMIT]( this[ORIGIN][CHILDREN].length, new Model( x, ), ), ), );
		
		this.length.setValue( this[ORIGIN][CHILDREN].length, );
	}
	
	unshift( ...children )
	{
		this[ORIGIN][CHILDREN].unshift( ...children.map( (x)=> this[EMIT]( 0, new Model( x, ), ), ), );
		
		this.length.setValue( this[ORIGIN][CHILDREN].length, );
	}
	
	pop()
	{
		this[EMIT]( this[ORIGIN][CHILDREN].length - 1, null, );
		
		const poped= this[ORIGIN][CHILDREN].pop();
		
		this.length.setValue( this[ORIGIN][CHILDREN].length - 1, );
		
		return poped;
	}
	
	shift()
	{
		this[EMIT]( 0, null, );
		
		const shifted= this[ORIGIN][CHILDREN].shift();
		
		this.length.setValue( this[ORIGIN][CHILDREN].length, );
		
		return shifted;
	}
	
	splice( start, count, ...inserted )
	{
		let removed= []
		
		if( count > 0 )
		{
			removed= this[ORIGIN][CHILDREN].splice( start, count, );
			
			removed.forEach( x=> this[EMIT]( start, null, ), );
		}
		
		this[ORIGIN][CHILDREN].splice( start, 0, ...inserted.map( ( x, i, )=> this[EMIT]( start- -i, new Model( x, ), ), ), );
		
		this.length.setValue( this[ORIGIN][CHILDREN].length, );
		
		return removed;
	}
	
	reverse()
	{
		for( let l= this[ORIGIN][CHILDREN].length, i= 0; i < l; ++i )
			this.splice( i, 0, this.pop(), );
		
		return this;
	}
	
	sort( comparer, )
	{
		this[SET_VALUE]( this[ORIGIN][CHILDREN].concat().sort( comparer, ), );
	}
	
	remove( ...children )
	{
		children.forEach( x=> {
			const index= this[ORIGIN][CHILDREN].indexOf( x, );
			
			if( index >= 0 )
				this.splice( index, 1, );
		} );
	}
	
	get length()
	{
		return this[LENGTH]||(this[LENGTH]= new Model( this[ORIGIN][CHILDREN].length, ));
	}
	
	[SET_VALUE]( value, )
	{
		if(!( Array.isArray( value, ) ))
			throw 'The value of ArrayModel must be as array.';
		
		let i= 0, j= 0, k= 0;
		while( i < this[ORIGIN][CHILDREN].length )
			if( j >= value.length )
				this[ORIGIN][CHILDREN].splice( i, ).forEach( ()=> this[EMIT]( i, null, ), );
			else
			if( this[ORIGIN][CHILDREN][i] === value[j] )
				++i, ++j;
			else
			if( 0 <= (k= value.indexOf( this[ORIGIN][CHILDREN][i], j, )) )
			{
				this[ORIGIN][CHILDREN].splice( i, 0, ...value.slice( j, k, ).map( ( x, ii, )=> this[EMIT]( i- -ii, new Model( x, ), ), ), );
				i-= j - 1 - k;
				j= k - - 1;
			}
			else
				this[ORIGIN][CHILDREN].splice( i, 1, ),  this[EMIT]( i, null, );
		if( j < value.length )
			this[ORIGIN][CHILDREN].push( ...value.slice( j, ).map( ( x, ii )=> this[EMIT]( i- -ii, new Model( x, ), ), ), );
		
		this.length.setValue( this[ORIGIN][CHILDREN].length, );
	}
	
	[EMIT]( index, model, )
	{
		setTimeout( ()=> this[ORIGIN][LISTENERS].forEach( listener=> listener( index, model, ), ), );
		
		return model;
	}
}

function setAsArrayModel( model, )
{
	Object.setPrototypeOf( model, ArrayModel.prototype, );
	
	model.constructor= ArrayModel;
}
