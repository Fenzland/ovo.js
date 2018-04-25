import Route from './Route.js';
import View from '../view/View.js';

export default class Router
{
	constructor()
	{
		this.routes= new Map;
	}
	
	/**
	 * Route a pattern to a PAGE.
	 */
	route( name, pattern, page, )
	{
		this.routes.set( name, new Route( pattern, page, ), );
	}
	
	/**
	 * Set a DOM as route container. and create a VIEW.
	 */
	showIn( container, )
	{
		this.view= new View( container, );
	}
	
	/**
	 * Listen to window.
	 */
	listen( window, )
	{
		window.addEventListener( 'popstate', e=>{
			console.log( e.state, );
			this._dispatch( window.location.pathname, );
		}, );
		
		this._dispatch( window.location.pathname, );
	}
	
	/**
	 * Dispatch with path.
	 * 
	 * @private
	 */
	_dispatch( path )
	{
		for( let [ name, route, ] of this.routes )
		{
			let matches= route.match( path, );
			
			if( matches )
			{
				// show loading.
				this.view.loading();
				
				// Render the PAGE and update the VIEW (async)
				return import(route.page+'.js').then( page=> this.view.update( page.default.render( matches, ), ), );
			}
		}
		
		// 404
	}
}
