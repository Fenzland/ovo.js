import Model, { ArrayModel, } from './Model.js';

const FIELDS= Symbol( 'fields', );

export default class Resource extends Model
{
	static boot()
	{
		if(!( this[FIELDS] ))
			this[FIELDS]= Object.entries( this.makeFields(), );
	}
	
	static makeSet( promise, temp=undefined, reject=undefined, )
	{
		if(!( promise.temp ))
			promise.temp= ()=> (temp||[]).map( x=> new this( x, ), );
		
		if(!( promise.rejected ))
			promise.rejected= ()=> (rejected||temp||[]).map( x=> new this( x, ), );
		
		return new ArrayModel( promise.then( data=> data.map( x=> new this( x, ), ), ), );
	}
	
	static get fields()
	{
		return this[FIELDS];
	}
}
