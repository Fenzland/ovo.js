import Model from './Model.js';
import Set from './Set.js';
import { HasMany, } from './Relation.js';

const FIELDS= Symbol( 'fields', );
const PRIMARY_KEY= Symbol( 'primary_key', );
const RELATIONS= Symbol( 'relations', );

export default class Resource extends Model
{
	static boot()
	{
		this[FIELDS]= this.makeFields();
		this[FIELDS].map= function( callback, ){ return Object.entries( this, ).map( callback, ); };
		this[FIELDS].forEach= function( callback, ){ Object.entries( this, ).forEach( callback, ); };
		
		this[PRIMARY_KEY]= this.primaryKey? this.primaryKey() : 'id';
		
		this[RELATIONS]= {};
	}
	
	static makeSet( promise, temp=undefined, reject=undefined, )
	{
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
	
	static getRelation( name, )
	{
		return this[RELATIONS][name];
	}
	
	static hasMany( name, resource, relatedName, )
	{
		return this[RELATIONS][name]= new HasMany( name, this, resource, relatedName, );
	}
}
