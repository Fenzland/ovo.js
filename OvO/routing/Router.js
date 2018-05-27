import Route from './Route.js';
import Link from './Link.js';
import History, { State, } from './History.js';
import View from '../view/View.js';
import { resolve, } from '../support/path.js';

const BASE_PATH= Symbol( 'base_path', );
const PAGE_DIR= Symbol( 'page_dir', );
const HISTORY= Symbol( 'history', );
const ROUTES= Symbol( 'routes', );
const WINDOW= Symbol( 'window', );
const DISPATCH= Symbol( 'dispatch', );

export default class Router
{
	constructor()
	{
		this[HISTORY]= new History;
		this[ROUTES]= new Map;
	}
	
	set pageDir( dir, )
	{
		this[PAGE_DIR]= dir;
	}
	
	set basePath( path, )
	{
		this[BASE_PATH]= path;
	}
	
	/**
	 * Route a path pattern to a PAGE.
	 * 
	 * @param String name
	 * @param String pattern
	 * @param String page
	 */
	route( name, pattern, page=undefined, )
	{
		page= resolve( this[PAGE_DIR], page||name );
		
		if( this[BASE_PATH] )
			pattern= `${this[BASE_PATH]}${pattern}`;
		
		this[ROUTES].set( name, new Route( name, pattern, page, ), );
	}
	
	/**
	 * Set a DOM as route container. and create a VIEW.
	 * 
	 * @param Element container
	 * 
	 * @return viod
	 */
	showIn( container, )
	{
		this.view= new View( container, );
	}
	
	/**
	 * Listen to the BOM window.
	 * 
	 * @param Window window
	 * 
	 * @return viod
	 */
	listen( window, )
	{
		this[WINDOW]= window;
		
		window.addEventListener( 'popstate', e=>{
			this[HISTORY].moveTo( e.state );
			this[DISPATCH]( window.location.pathname, window.location.search, window.location.hash, );
		}, );
		
		const route= this[DISPATCH]( window.location.pathname, window.location.search, window.location.hash, );
		
		this[HISTORY].push(
			new State( window.location.href, route.name, ),
		);
	}
	
	/**
	 * Build a link to route.
	 * 
	 * @param String routeName
	 * @param Object params
	 * 
	 * @return Link
	 */
	linkTo( routeName, params, )
	{
		const route= this[ROUTES].get( routeName, )
		
		if(!( route ))
			throw `Route ${routeName} is not defiend.`;
		
		return route.link( this, params, );
	}
	
	/**
	 * Goto another page.
	 * 
	 * @param Link link
	 * 
	 * @return viod
	 */
	goto( link, )
	{
		const route= this[DISPATCH]( link.url, '', '', );
		
		const state= new State( link.url, route.name, );
		
		this.history.push( state, );
		
		this[WINDOW].history.pushState( state, '', link.url, );
	}
	
	match( routeName, index=0, )
	{
		return this[HISTORY].match( routeName, index, );
	}
	
	get history()
	{
		return this[HISTORY];
	}
	
	/**
	 * Dispatch with url.
	 * 
	 * @private
	 */
	[DISPATCH]( path, query, anchor, )
	{
		for( let [ name, route, ] of this[ROUTES] )
		{
			let matches= route.match( path, );
			
			if( matches )
			{
				// show loading.
				this.view.loading();
				
				// Render the PAGE and update the VIEW (async)
				import(route.page+'.js').then(
					page=> this.view.update(
						page.default.render( matches, query, anchor, ),
					),
				);
				
				return route;
			}
		}
		
		// 404
	}
}

