const CONTAINER= Symbol( 'container', );
const INSERT= Symbol( 'insert', );

import { create, diff, } from './VDOM.js'

export default class View
{
	constructor( container, )
	{
		this[CONTAINER]= container;
	}
	
	update( vdoms )
	{
		// const diffrence= diff( this.vdom, vdom );
		//
		// update( diffrence, )
		
		//*
		
		this[CONTAINER].innerHTML= '';
		
		if( Array.isArray( vdoms, ) ){
			const container= create( this[CONTAINER].tagName, ...vdoms );
			
			container.children.forEach( x=> this[INSERT]( x.toDOM( document, ), ), );
		}
		else
		{
			this[INSERT]( vdoms.toDOM( document, ), );
		}
		
		/*/
		
		let html= '';
		if( Array.isArray( vdoms, ) )
			for( let vdom of vdoms )
				html+= vdom.toHTML();
		else
			html+= vdoms.toHTML();
		this[CONTAINER].innerHTML= html;
		
		//*/
	}
	
	[INSERT]( doms, )
	{
		if( Array.isArray( doms, ) )
			doms.forEach( x=> this[CONTAINER].appendChild( x, ), );
		else
			this[CONTAINER].appendChild( doms, );
	}
	
	loading()
	{
		
	}
}
