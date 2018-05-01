import { diff, } from './VDOM.js'

export default class View
{
	constructor( container, )
	{
		this.container= container;
	}
	
	update( vdom )
	{
		// const diffrence= diff( this.vdom, vdom );
		//
		// update( diffrence, )
		
		this.container.innerHTML= '';
		this.container.appendChild( vdom.toDOM( document, ), );
		// this.container.innerHTML= vdom;
	}
	
	loading()
	{
		
	}
}
