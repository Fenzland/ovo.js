window.z= ( a, ...o )=> (console.log( a, ...o, ) , a);
window.v= ( a, ...o )=> (console.log( a.valueOf?a.valueOf():a, ...o.map( x=> x.valueOf?x.valueOf():x, ), ) , a);

window.timeout= ( time, value, )=> new Promise( ( resolve, reject, )=> setTimeout( ()=> resolve( value, ), time, ), );
window.nextFrame= value=> new Promise( ( resolve, reject, )=> requestAnimationFrame( ()=> resolve( value, ), ), );

Map.prototype.achieve= function( key, fallback, ){
	if( this.has( key, ) )
		return this.get( key, );
	else
	{
		if( fallback instanceof Function )
			fallback= fallback();
		
		this.set( key, fallback, );
		
		return fallback;
	}
};

Array.prototype.replace= function( value, ...replacements ){
	
	const index= this.indexOf( value, );
	
	if( index >= 0 )
	{
		this.splice( index, 1, ...replacements, );
		
		return true;
	}
	else
		return false;
};

Array.prototype.findAndReplace= function( predicate, ...replacements ){
	
	const index= this.findIndex( predicate, );
	
	if( index >= 0 )
	{
		this.splice( index, 1, ...replacements, );
		
		return true;
	}
	else
		return false;
};
