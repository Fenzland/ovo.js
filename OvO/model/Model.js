const CHILDREN= Symbol( 'children', );
const VALUE= Symbol( 'value', );
const LISTENERS= Symbol( 'listeners', );
const SET_VALUE= Symbol( 'set_value', );
const ORIGIN= Symbol( 'origin', );
const OBJECT_VALUE= Symbol( 'object_value', );
const LENGTH= Symbol( 'length', );
const EMIT= Symbol( 'emit', );

function makeProxy( target, )
{
	return new Proxy( target, {
		
		get( target, key, receiver, )
		{
			const getter= target.__lookupGetter__( key, );
			
			if( getter )
			{
				return getter.call( target, );
			}
			else
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
		
		has( target, key, )
		{
			return key in target[CHILDREN];
		},
		
		deleteProperty( target, key, )
		{
			return delete target[CHILDREN][key];
		},
		
		ownKeys( target, )
		{
			return Object.keys( target[CHILDREN], );
		},
		
		getOwnPropertyDescriptor( target, key, )
		{
			return Object.getOwnPropertyDescriptor( target[CHILDREN], key, );
		},
		
		getOwnPropertyDescriptors( target, )
		{
			return Object.getOwnPropertyDescriptors( target[CHILDREN], );
		},
	}, );
}

export default class Model
{
	constructor( value, )
	{
		if( value instanceof Model ) return value;
		
		let target;
		
		if( Array.isArray( value, ) )
		{
			Object.setPrototypeOf( target= [], ArrayModel.prototype, );
		}
		else
			target= this
		
		target[CHILDREN]= {};
		target[LISTENERS]= [];
		target[ORIGIN]= target;
		
		if( Array.isArray( value, ) )
		{
			target[CHILDREN]= value.map( x=> new Model( x, ), );
		}
		else
		if( value instanceof Object )
		{
			for( let key in value )
			{
				target[CHILDREN][key]= new Model( value[key], );
			}
			
			target[VALUE]= OBJECT_VALUE;
		}
		else
		{
			target[VALUE]= value;
		}
		
		return makeProxy( target, );
	}
	
	setValue( value, )
	{
		if( value instanceof Promise )
		{
			if( value.temp !== undefined )
				this.setValue( value.temp, );
			
			value.then(
				x=> this.setValue( x, ),
				e=> {
					this.setValue( value.rejected, );
					throw e;
				},
			);
		}
		else
		if( value instanceof Function )
		{
			this.setValue( value(), );
		}
		else
		if( value instanceof Model )
		{
			const originValue= this.valueOf();
			
			this[VALUE]= value[VALUE];
			Object.assign( this, value[CHILDREN], );
			
			this[EMIT]( this.valueOf(), originValue, );
		}
		else
		if( value instanceof Object && !(value instanceof Array) )
		{
			const originValue= this.valueOf();
			
			Object.assign( this, value, );
			
			this[EMIT]( value, originValue, );
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
		
		this[EMIT]( value, originValue, );
	}
	
	[EMIT]( value, originValue, )
	{
		this[ORIGIN][LISTENERS].forEach( listener=> listener( value, originValue, ), );
	}
	
	valueOf()
	{
		if( this[ORIGIN][VALUE] === OBJECT_VALUE )
			return this[ORIGIN][CHILDREN];
		else
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
	}
	
	static express( callback, ...models )
	{
		const expression= new Model( callback( ...models.map( x=> x instanceof Model ? x.valueOf() : x, ), ), );
		
		models.forEach(
			model=> model instanceof Model && model.listenedBy( ()=> expression.setValue( callback( ...models.map( x=>x.valueOf(), ), ), ) ),
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
	
	find( finder, )
	{
		const m= new Model( this[CHILDREN].find( finder, ), );
		
		this.listenedBy( ( index, model, )=> {
			if( model && finder( model, ) )
				m.setValue( model, );
		}, );
		
		return m;
	}
	
	findIndex( finder, )
	{
		const m= new Model( this[CHILDREN].findIndex( finder, ), );
		
		this.listenedBy( ( index, model, )=> {
			if( model && finder( model, ) )
				m.setValue( index, );
		}, );
		
		return m;
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
	
	valueOf()
	{
		return this[ORIGIN][CHILDREN].concat();
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
