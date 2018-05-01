import { create, } from './VDOM.js';
import Link from '../routing/Link.js'

export const   header= ( ...args )=> create(  'header', ...args, );
export const      nav= ( ...args )=> create(     'nav', ...args, );
export const  section= ( ...args )=> create( 'section', ...args, );
export const  article= ( ...args )=> create( 'article', ...args, );
export const     main= ( ...args )=> create(    'main', ...args, );
export const      div= ( ...args )=> create(     'div', ...args, );
export const       h1= ( ...args )=> create(      'h1', ...args, );
export const       h2= ( ...args )=> create(      'h2', ...args, );
export const       h3= ( ...args )=> create(      'h3', ...args, );
export const       h4= ( ...args )=> create(      'h4', ...args, );
export const       h5= ( ...args )=> create(      'h5', ...args, );
export const       h6= ( ...args )=> create(      'h6', ...args, );
export const        p= ( ...args )=> create(       'p', ...args, );

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

export const input= {
	input:    ( ...args )=> create( 'input', ...args, { type:'input', } ),
	text:     ( ...args )=> create( 'input', ...args, { type:'text', } ),
	search:   ( ...args )=> create( 'input', ...args, { type:'search', } ),
	password: ( ...args )=> create( 'input', ...args, { type:'password', } ),
	email:    ( ...args )=> create( 'input', ...args, { type:'email', } ),
	url:      ( ...args )=> create( 'input', ...args, { type:'url', } ),
	tel:      ( ...args )=> create( 'input', ...args, { type:'tel', } ),
	number:   ( ...args )=> create( 'input', ...args, { type:'number', } ),
	range:    ( ...args )=> create( 'input', ...args, { type:'range', } ),
	radio:    ( ...args )=> create( 'input', ...args, { type:'radio', } ),
	checkbox: ( ...args )=> create( 'input', ...args, { type:'checkbox', } ),
	date:     ( ...args )=> create( 'input', ...args, { type:'date', } ),
	month:    ( ...args )=> create( 'input', ...args, { type:'month', } ),
	week:     ( ...args )=> create( 'input', ...args, { type:'week', } ),
	time:     ( ...args )=> create( 'input', ...args, { type:'time', } ),
	datetime: ( ...args )=> create( 'input', ...args, { type:'datetime-local', } ),
	color:    ( ...args )=> create( 'input', ...args, { type:'color', } ),
	file:     ( ...args )=> create( 'input', ...args, { type:'file', } ),
};

export default new Proxy( {}, {
	
	get( target, key, receiver, )
	{
		return ( ...args )=> create( key, ...args, );
	},
	
	apply( target, context, args, )
	{
		return create( ...args, );
	},
}, )
