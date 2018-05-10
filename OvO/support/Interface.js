const PROTO= Symbol( 'proto', );

export default class Interface
{
	constructor( proto, )
	{
		this[PROTO]= proto;
	}
	
	check( object, )
	{
		for( let i in this[PROTO] )
			if(!( object && object[i] && object[i] instanceof this[PROTO][i] ))
				return false;
		
		return true;
	}
}
