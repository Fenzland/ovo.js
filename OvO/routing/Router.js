import Route from './Route.js';
import Link from './Link.js';
import History from './History.js';
import View from '../view/View.js';
import { resolve, } from '../support/path.js';

const BASE_PATH= Symbol( 'base_path', );
const PAGE_DIR= Symbol( 'page_dir', );
const HISTORY= Symbol( 'history', );
const ROUTES= Symbol( 'routes', );
const WINDOW= Symbol( 'window', );
const DISPATCH= Symbol( 'dispatch', );
const RENDER= Symbol( 'render', );

export default class Router
{
	constructor()
	{
		this[ROUTES]= new Map;
	}
	
	set pageDir( dir )
	{
		this[PAGE_DIR]= dir;
	}
	
	set basePath( path )
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
		if( this[BASE_PATH] )
			pattern= `${this[BASE_PATH]}${pattern}`;
		
		const route= new Route( name, pattern, page||name, );
		
		this[ROUTES].set( name, route, );
		
		return route;
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
		const route= this[DISPATCH]( window.location.pathname, window.location.search, window.location.hash, );
		
		this[WINDOW]= window;
		this[HISTORY]= new History( window, route.name, );
		
		window.addEventListener( 'popstate', e=>{
			this[HISTORY].moveTo( e.state, );
			this[DISPATCH]( window.location.pathname, window.location.search, window.location.hash, );
		}, );
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
		const route= this[DISPATCH]( link.path, '', '', );
		
		if(!( route )) return false;
		
		
		this[HISTORY].push( route.name, link.url, );
		
		return true;
	}
	
	reload()
	{
		this[DISPATCH]( this[WINDOW].location.pathname, this[WINDOW].location.search, this[WINDOW].location.hash, );
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
				
				this[RENDER]( route, matches, query, anchor, );
				
				return route;
			}
		}
		
		// 404
	}
	
	[RENDER]( route, params, query, anchor, )
	{
		const blocker= route.gates.reduce( ( blocker, gate, )=> blocker || (gate.validate()? null : gate), null, )
		const page= (blocker||route).page;
		
		// Render the PAGE and update the VIEW (async)
		import(resolve( this[PAGE_DIR], page+'.js')).then(
			page=> {
				if(!( page.render && page.render instanceof Function ))
					throw new Error( 'A page must export function render()', );
				
				this.view.update(
					page.render( { params, query, anchor, }, ),
				);
			},
		);
	}
}

