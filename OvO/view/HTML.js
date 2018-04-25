import { create, } from './VDOM.js';

export const   header= ( ...ags )=> create(  'header', ...args );
export const  section= ( ...ags )=> create( 'section', ...args );
export const     main= ( ...ags )=> create(    'main', ...args );
export const      div= ( ...ags )=> create(     'div', ...args );
export const       h1= ( ...ags )=> create(      'h1', ...args );

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
