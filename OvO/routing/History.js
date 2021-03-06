import session from '../support/session.js';
import Model, { $, } from '../model/Model.js';

const INIT= Symbol( 'init', );
const WINDOW= Symbol( 'window', );
const SESSION= Symbol( 'session', );
const STORE_SESSION= Symbol( 'store_session', );
const LOAD_FROM_SESSION= Symbol( 'load_from_session', );
const INDEX= Symbol( 'index', );
const STATES= Symbol( 'states', );
const URL= Symbol( 'url', );
const ROUTE_NAME= Symbol( 'route_name', );

export default class History
{
	constructor( window, initRoute, )
	{
		this[WINDOW]= window;
		this[SESSION]= session( 'history', );
		
		if(!( this[SESSION].has( 'history', ) && this[LOAD_FROM_SESSION]() ) )
			this[INIT]( initRoute, );
		
		window.addEventListener( 'beforeunload', e=> this[STORE_SESSION](), );
	}
	
	push( route, url, )
	{
		this[INDEX].setValue( this[INDEX] - - 1, );
		
		const state= { index: this[INDEX].valueOf(), route, url, };
		
		this[STATES].splice( this[INDEX].valueOf(), Infinity, state, );
		
		this[WINDOW].history.pushState( state, '', url, );
	}
	
	getState( offset=0, )
	{
		return $( ( states, index, )=> states[index - - offset], this[STATES], this[INDEX], );
	}
	
	get states()
	{
		return $( ( states, index, )=> states.map( state=> Object.assign( state, { offset: state.index - index, }, ), ), this[STATES], this[INDEX], );
	}
	
	get current()
	{
		return this.getState( 0, );
	}
	
	moveTo( state, )
	{
		this[INDEX].setValue( state.index.valueOf(), );
	}
	
	go( offset, )
	{
		this[WINDOW].history.go( offset, );
		
		return true;
	}
	
	goTo( state, )
	{
		return this.go( state.index.valueOf() - this[INDEX], );
	}
	
	backTo( route, )
	{
		const state= this[STATES].valueOf().slice( 0, this[INDEX].valueOf(), ).reverse().find( state=> state.route===route, );
		
		if( state )
			return this.goTo( state, );
		else
			return false;
	}
	
	aheadTo( route, )
	{
		const state= this[STATES].valueOf().slice( this[INDEX].valueOf() - - 1, Infinity, ).find( state=> state.route===route, );
		
		if( state )
			return this.goTo( state, );
		else
			return false;
	}
	
	[INIT]( route, )
	{
		const state= {
			index: 0,
			route,
			url: this[WINDOW].location.href,
		};
		
		this[STATES]= new Model( [ state, ], );
		this[INDEX]= new Model( 0, );
		this[WINDOW].history.replaceState( state, '', state.url, );
	}
	
	[STORE_SESSION]()
	{
		this[SESSION].set( 'history', {
			states: this[STATES].valueOf(),
			index: this[INDEX].valueOf(),
		}, );
	}
	
	[LOAD_FROM_SESSION]()
	{
		const stored= this[SESSION].get( 'history', );
		
		if(!( stored && stored.states && stored.states.length ))
			return false;
		
		this[STATES]= new Model( stored.states, );
		this[INDEX]= new Model( stored.index, );
		
		return true;
	}
}
