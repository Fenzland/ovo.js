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
		
		if(!( relation ))
			throw `Relation '${relationName}' not exists.`;
		
		function load( x, )
		{
			x[relation.name]= relation.loadFromOne( x, options, );
		}
		
		this.forEach( x=> load( x, ), )
		
		this.observedBy( ( i, x, )=> load( x, ), );
		
		return this;
	}
	
	find( keyValue, )
	{
		return super.find( x=> x.keyIs( keyValue, ), );
	}
	
	get keys()
	{
		const keyName= this[RESOURCE].key;
		
		if( Array.isArray( keyName, ) )
			return this.map( x=> keyName.map( k=> x[k], ), );
		else
			return this.map( x=> x[keyName], );
	}
}
