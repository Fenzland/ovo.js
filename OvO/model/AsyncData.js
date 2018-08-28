
const REJECTED= Symbol( 'rejected', );

export default class AsyncData extends Promise
{
	constructor( param, temp, rejected, )
	{
		if( param instanceof Promise )
		{
			super( ( resolve, reject, )=> param.then( resolve, reject, ), );
		}
		else
		if( param instanceof Function )
		{
			super( param, );
		}
		else
		{
			super( ( resolve, reject, )=> resolve( param, ), );
		}
		
		this.temp= temp;
		this[REJECTED]= rejected;
	}
	
	get rejected()
	{
		if( this[REJECTED] instanceof Function )
			return this[REJECTED]();
		else
			return this[REJECTED];
	}
	
	set rejected( rejected, )
	{
		this[REJECTED]= rejected
	}
}
