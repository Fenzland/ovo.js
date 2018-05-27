const NEXTS= Symbol( 'nexts', );
const RESOLVE= Symbol( 'resolve', );
const REJECT= Symbol( 'reject', );
const THEN= Symbol( 'then', );
const CATCH= Symbol( 'catch', );

export default class RePromise extends Promise
{
	constructor( callback, )
	{
		super( ()=> {}, );
		
		callback( this[RESOLVE].bind( this, ), this[REJECT].bind( this, ), );
		
		this[NEXTS]= [];
	}
	
	then( $then, $catch, )
	{
		const next= new RePromise( ()=> {}, );
		
		next[THEN]= $then;
		next[CATCH]= $catch;
		
		this[NEXTS].push( next, );
		
		return next;
	}
	
	catch( $catch, )
	{
		return this.then( undefined, $catch, );
	}
	
	finally( $finally, )
	{
		return this.then( $finally, $finally, );
	}
	
	thenOnce( $then, $catch, )
	{
		let resolve, reject;
		const next= new Promise( ( r, j, )=> { resolve= r; reject= j; }, );
		
		next[RESOLVE]= resolve;
		next[REJECT]= reject;
		
		this[NEXTS].push( next, );
		
		return next.then( $then, $catch, );
	}
	
	catchOnce( $catch, )
	{
		return this.then( undefined, $catch, );
	}
	
	finallyOnce( $finally, )
	{
		return this.then( $finally, $finally, );
	}
	
	[RESOLVE]( data, )
	{
		if( data instanceof RePromise )
			return data.thenOnce( data=> this[RESOLVE]( data, ), e=> this[REJECT]( e, ), );
		if( data instanceof Promise )
			return data.then( data=> this[RESOLVE]( data, ), e=> this[REJECT]( e, ), );
		
		if( this[THEN] )
			try{
				data= this[THEN]( data, )
			}catch(e){
				this[NEXTS].forEach( x=> x[REJECT]( e, ), );
			}
		
		this[NEXTS].forEach( x=> x[RESOLVE]( data, ), );
	}
	
	[REJECT]( e, )
	{
		this[NEXTS].forEach( x=> x[REJECT]( e, ), );
	}
}
