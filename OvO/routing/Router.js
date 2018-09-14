import Route from './Route.js';
import Link from './Link.js';
import History from './History.js';
import View from '../view/View.js';
import { resolve, traceBack, dirname, } from '../support/path.js';

const BASE_PATH= Symbol( 'base_path', );
const PAGE_DIR= Symbol( 'page_dir', );
const HISTORY= Symbol( 'history', );
const ROUTES= Symbol( 'routes', );
const VIEW= Symbol( 'view', );
const WINDOW= Symbol( 'window', );
const DISPATCH= Symbol( 'dispatch', );
const CURRENT= Symbol( 'current', );
const RENDER= Symbol( 'render', );

export default class Router
{
	constructor( basePath, pageDIr, )
	{
		const baseOn= dirname( traceBack(), );
		
		this[BASE_PATH]= new URL( resolve( baseOn, basePath, ), ).pathname.replace( /\/$/, '', );
		this[PAGE_DIR]= resolve( baseOn, pageDIr, );
		this[ROUTES]= new Map;
	}
	
	/**
	 * Set a DOM as route container. and create a VIEW.
	 * 
	 * @param String params.[name]
	 * @param String params.*.path
	 * @param String params.*.page
	 * @param String params.*.title
	 * @param Array  params.*.gates
	 * @param Object params.*.follow
	 * 
	 * @param String options.*.preName
	 * @param String options.*.prePath
	 * @param String options.*.prePage
	 * @param Array  options.*.preGates
	 * 
	 * @return void
	 */
	route( params, { preName='', prePath=this[BASE_PATH], prePage='', preGates=[], }={}, )
	{
		for( let name in params )
		{
			const param= params[name];
			let { path, page=name, title=name, gates=[], follow, }= typeof param ==='string'? { path:param, } : param;
			
			if( preName ) name= `${preName}.${name}`;
			if( prePath ) path= `${prePath}${path}`;
			if( prePage ) page= resolve( prePage, page, );
			if( preGates ) gates.push( ...preGates, );
			
			const route= new Route( name, title, path, page, );
			
			route.gatedBy( ...gates, );
			
			this[ROUTES].set( name, route, );
			
			if( follow )
				this.route( follow, { preName:name, prePath:path, prePage:page, preGates:gates, }, );
		}
	}
	
	/**
	 * Set a DOM as route container. and create a VIEW.
	 * 
	 * @param Element container
	 * 
	 * @return void
	 */
	showIn( container, )
	{
		this[VIEW]= new View( container, );
	}
	
	/**
	 * Listen to the BOM window.
	 * 
	 * @param Window window
	 * 
	 * @return void
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
		if( routeName.startsWith( '.', ) )
			routeName= this.resolve( this[CURRENT].name, routeName, );
		
		const route= this[ROUTES].get( routeName, )
		
		if(!( route ))
			throw `Route ${routeName} is not defiend.`;
		
		return route.buildLink( this, params, );
	}
	
	resolve( base, name, )
	{
		if( name.startsWith( '..', ) )
			return this.resolve( base.replace( /(?:^|\.)\w+$/, '', ), name.replace( /^\./, '', ), );
		else
		if( name.startsWith( '.', ) )
			return `${base}${name}`;
		else
			return name;
	}
	
	/**
	 * Goto another page.
	 * 
	 * @param Link link
	 * 
	 * @return void
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
	
	get current()
	{
		return this[CURRENT];
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
				this[CURRENT]= route;
				
				this[RENDER]( route, matches, query, anchor, );
				
				return route;
			}
		}
		
		// 404
	}
	
	async [RENDER]( route, params, query, anchor, )
	{
		const blocker= route.gates.reduce( ( blocker, gate, )=> blocker || (gate.validate()? null : gate), null, )
		const pageName= (blocker||route).page;
		
		// Render the PAGE and update the VIEW (async)
		const page= await import(resolve( this[PAGE_DIR], pageName.replace( /^\//, '', )+'.js'))
		
		if(!( page.render && page.render instanceof Function ))
			throw new Error( 'A page must export function render()', );
		
		this[VIEW].update(
			page.render( { params, query, anchor, }, ),
		);
	}
}
