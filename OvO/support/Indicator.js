import RePromise from './RePromise.js';
const PROMISE= Symbol( 'promise', );

export class Indicator
{
	constructor()
	{
		this[PROMISE]= new Promise( ( resolve, reject, )=> { this.resolve= resolve; this.reject= reject; }, );
	}
	
	then( ...args )
	{
		return this[PROMISE].then( ...args, );
	}
	
	catch( ...args )
	{
		return this[PROMISE].catch( ...args, );
	}
	
	finally( ...args )
	{
		return this[PROMISE].finally( ...args, );
	}
}

export class ReIndicator
{
	constructor()
	{
		this[PROMISE]= new RePromise( ( resolve, reject, )=> { this.resolve= resolve; this.reject= reject; }, );
	}
	
	then( ...args )
	{
		return this[PROMISE].then( ...args, );
	}
	
	catch( ...args )
	{
		return this[PROMISE].catch( ...args, );
	}
	
	finally( ...args )
	{
		return this[PROMISE].catch( ...args, );
	}
	
	thenOnce( ...args )
	{
		return this[PROMISE].thenOnce( ...args, );
	}
	
	catchOnce( ...args )
	{
		return this[PROMISE].catchOnce( ...args, );
	}
	
	finallyOnce( ...args )
	{
		return this[PROMISE].finallyOnce( ...args, );
	}
}
