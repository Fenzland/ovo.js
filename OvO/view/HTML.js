import { create, } from './VDOM.js';
import Link from '../routing/Link.js'

export const   header= ( ...args )=> create(  'header', ...args );
export const  section= ( ...args )=> create( 'section', ...args );
export const     main= ( ...args )=> create(    'main', ...args );
export const      div= ( ...args )=> create(     'div', ...args );
export const       h1= ( ...args )=> create(      'h1', ...args );

export const a= ( ...args )=> {
	const vdom= create( 'a', ...args );
	
	const link= vdom.getAttribute( 'href', );
	
	if( link instanceof Link )
		vdom.addListener( 'click', e=> {
			e.preventDefault();
			
			link.active();
		} );
	
	return vdom;
}

export default new Proxy( {}, {
	
	get( target, key, receiver, )
	{
		return ( ...args )=> create( key, ...args );
	},
	
	apply( target, context, args, )
	{
		return create( ...args );
	},
}, )
