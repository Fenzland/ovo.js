import { ucfirst, } from '../support/string.js'

export default class Relation
{
	
}

export class HasMany extends Relation
{
	constructor( name, from, to, relatedName, )
	{
		super();
		
		this.from= from;
		this.to= to;
		this.name= name;
		this.relatedName= relatedName;
	}
	
	loadFromOne( model, options, )
	{
		return this.to[`of${ucfirst( this.relatedName, )}`]( model, options, );
	}
	
	loadFromMany( set, options, )
	{
		if( set.length>0 )
			return this.to[`of${ucfirst( this.relatedName, )}s`]( set, options, );
		else
			return [];
	}
}

export class BelongsTo extends Relation
{
	constructor( name, from, to, relatedName, )
	{
		super();
		
		this.from= from;
		this.to= to;
		this.name= name;
		this.relatedName= relatedName;
	}
	
	loadFromOne( model )
	{
		return this.to.find( model[this.relatedName] );
	}
	
	loadFromMany( set )
	{
		if( set.length>0 )
			return this.to.findMany( set.map( x=> x[this.relatedName], ) );
		else
			return [];
	}
}
