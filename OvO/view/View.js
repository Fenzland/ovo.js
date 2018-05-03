import { diff, } from './VDOM.js'

export default class View
{
	constructor( container, )
	{
		this.container= container;
	}
	
	update( vdoms )
	{
		// const diffrence= diff( this.vdom, vdom );
		//
		// update( diffrence, )
		
		//*
		
		this.container.innerHTML= '';
		if( vdoms instanceof Array )
			for( let vdom of vdoms )
				this.container.appendChild( vdom.toDOM( document, ), );
		else
			this.container.appendChild( vdoms.toDOM( document, ), );
		
		/*/
		
		let html= '';
		if( vdoms instanceof Array )
			for( let vdom of vdoms )
				html+= vdom;
		else
			html+= vdoms;
		this.container.innerHTML= html;
		
		//*/
	}
	
	loading()
	{
		
	}
}
