import { ArrayModel, } from './Model.js';

const RESOURCE= Symbol( 'resource', );

export default class Set extends ArrayModel
{
	constructor( resource, data, )
	{
		super( data, );
		
		this[RESOURCE]= resource;
		
		Object.setPrototypeOf( this, Set.prototype, );
	}
	
	load( relationName, options={}, )
	{
		const relation= this[RESOURCE].getRelation( relationName, );
		
		function load( x, )
		{
			x[relation.name]= relation.loadFromOne( x, options, );
		}
		
		this.forEach( x=> load( x, ), )
		
		this.listenedBy( ( i, x, )=> load( x, ), );
		
		return this;
	}
	
	get keys()
	{
		const keyName= this[RESOURCE].key;
		
		return z(this).map( x=> x[keyName], );
	}
}
