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
		
		return [];
	}
}
