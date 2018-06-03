import Model from './Model.js';
import Set from './Set.js';
import { HasMany, BelongsTo, } from './Relation.js';
import EnumerableObject from '../support/EnumerableObject.js';

const FIELDS= Symbol( 'fields', );
const PRIMARY_KEY= Symbol( 'primary_key', );
const RELATIONS= Symbol( 'relations', );

export default class Resource extends Model
{
	static boot()
	{
		this[FIELDS]= this.makeFields();
		Object.setPrototypeOf( this[FIELDS], EnumerableObject.prototype, )
		this[FIELDS]
		this[PRIMARY_KEY]= this.primaryKey? this.primaryKey() : 'id';
		
		this[RELATIONS]= {};
	}
	
	static makeInstance( promise, temp=undefined, rejected=undefined, )
	{
		if( !promise.temp && temp )
			promise.temp= temp;
		
		if( !promise.rejected && rejected )
			promise.rejected= rejected||temp;
		
		const instance= new this( this.defaults, );
		
		instance.setValue( promise, );
		
		return instance;
	}
	
	static makeSet( promise, temp=undefined, rejected=undefined, )
	{
		if( promise instanceof Function )
			return this.makeSet( promise(), temp, rejected, );
		
		if(!( promise.temp ))
			promise.temp= ()=> (temp||[]).map( x=> new this( x, ), );
		
		if(!( promise.rejected ))
			promise.rejected= ()=> (rejected||temp||[]).map( x=> new this( x, ), );
		
		return new Set( this, promise.then( data=> data.map( x=> new this( x, ), ), ), );
	}
	
	static get fields()
	{
		return this[FIELDS];
	}
	
	static get key()
	{
		return this[PRIMARY_KEY];
	}
	
	static get defaults()
	{
		return this[FIELDS].map( ( name, field, )=> {
			if( field.defaults )
				return field.defaults;
			
			switch( field.type )
			{
				case String:  return '';
				case Number:  return 0;
				case Boolean: return false;
				case Array:   return [];
				case Object:  return {};
				default:      return new field.type();
			}
		}, );
	}
	
	static getRelation( name, )
	{
		return this[RELATIONS][name];
	}
	
	static hasMany( name, resource, relatedName, )
	{
		return this[RELATIONS][name]= new HasMany( name, this, resource, relatedName, );
	}
	
	static belongsTo( name, resource, relatedName, )
	{
		return this[RELATIONS][name]= new BelongsTo( name, this, resource, relatedName, );
	}
	
	static findMany( keys, )
	{
		return this.makeSet(
			keys.map( key=> this.find( key, ), )
		);
	}
	
	keyIs( key )
	{
		const keyName= this.constructor.key;
		
		if( Array.isArray( keyName, ) )
			if( Array.isArray( key, ) )
				return keyName.reduce(
					( reduced, x, i, )=> reduced && (this[x]&&this[x].valueOf())===(key[i]&&key[i].valueOf()),
					true,
				);
			else
				return false;
		else
			return this[keyName].valueOf()===key;
	}
	
	load( relationName, options={}, )
	{
		const relation= this.constructor.getRelation( relationName, );
		
		if(!( relation ))
			throw `Relation '${relationName}' not exists.`;
		
		function load( x, )
		{
			x[relation.name]= relation.loadFromOne( x, options, );
		}
		
		load( this, );
		
		this.listenedBy( ()=> load( this, ), );
		
		return this;
	}
}
