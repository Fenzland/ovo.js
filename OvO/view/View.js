const CONTAINER= Symbol( 'container', );
const INSERT= Symbol( 'insert', );

import { create, forEach, diff, } from './VDOM.js'

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
		
		forEach(
			vdoms,
			x=> x.toDOM( document, ).forEach(
				x=> this[CONTAINER].appendChild( x, ),
			),
		);
		
		/*/
		
		let html= '';
		
		forEach( vdoms, x=> html+= x.toHTML(), );
		
		this[CONTAINER].innerHTML= html;
		
		//*/
	}
	
	loading()
	{
		
	}
}
