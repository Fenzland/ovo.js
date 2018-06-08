import { create, } from './VDOM.js';
import Link from '../routing/Link.js'

export const   header= ( ...args )=> create(  'header', ...args, );
export const     main= ( ...args )=> create(    'main', ...args, );
export const   footer= ( ...args )=> create(  'footer', ...args, );
export const      nav= ( ...args )=> create(     'nav', ...args, );
export const  section= ( ...args )=> create( 'section', ...args, );
export const  article= ( ...args )=> create( 'article', ...args, );
export const      div= ( ...args )=> create(     'div', ...args, );
export const       h1= ( ...args )=> create(      'h1', ...args, );
export const       h2= ( ...args )=> create(      'h2', ...args, );
export const       h3= ( ...args )=> create(      'h3', ...args, );
export const       h4= ( ...args )=> create(      'h4', ...args, );
export const       h5= ( ...args )=> create(      'h5', ...args, );
export const       h6= ( ...args )=> create(      'h6', ...args, );
export const       h7= ( ...args )=> create(      'h7', ...args, );
export const       h8= ( ...args )=> create(      'h8', ...args, );
export const        p= ( ...args )=> create(       'p', ...args, );
export const       dl= ( ...args )=> create(      'dl', ...args, );
export const       dt= ( ...args )=> create(      'dt', ...args, );
export const       dd= ( ...args )=> create(      'dd', ...args, );
export const     span= ( ...args )=> create(    'span', ...args, );
export const    small= ( ...args )=> create(   'small', ...args, );
export const     code= ( ...args )=> create(    'code', ...args, );
export const fieldset= ( ...args )=> create('fieldset', ...args, );
export const   legend= ( ...args )=> create(  'legend', ...args, );
export const    label= ( ...args )=> create(   'label', ...args, );
export const    table= ( ...args )=> create(   'table', ...args, );
export const  caption= ( ...args )=> create( 'caption', ...args, );
export const    thead= ( ...args )=> create(   'thead', ...args, );
export const    tbody= ( ...args )=> create(   'tbody', ...args, );
export const       tr= ( ...args )=> create(      'tr', ...args, );
export const       th= ( ...args )=> create(      'th', ...args, );
export const       td= ( ...args )=> create(      'td', ...args, );
export const      img= ( ...args )=> create(     'img', ...args, );
export const   option= ( ...args )=> create(  'option', ...args, );

export const a= createLinkTag( 'a', 'href', 'click', );
export const form= createLinkTag( 'form', 'action', 'submit', );

export const input= {
	hidden:   ( ...args )=> create( 'input', ...args, { type:'hidden', } ).empty(),
	text:     ( ...args )=> create( 'input', ...args, { type:'text', } ).empty(),
	search:   ( ...args )=> create( 'input', ...args, { type:'search', } ).empty(),
	password: ( ...args )=> create( 'input', ...args, { type:'password', } ).empty(),
	email:    ( ...args )=> create( 'input', ...args, { type:'email', } ).empty(),
	url:      ( ...args )=> create( 'input', ...args, { type:'url', } ).empty(),
	tel:      ( ...args )=> create( 'input', ...args, { type:'tel', } ).empty(),
	number:   ( ...args )=> create( 'input', ...args, { type:'number', } ).empty(),
	range:    ( ...args )=> create( 'input', ...args, { type:'range', } ).empty(),
	radio:    ( ...args )=> create( 'input', ...args, { type:'radio', } ).empty(),
	checkbox: ( ...args )=> create( 'input', ...args, { type:'checkbox', } ).empty(),
	date:     ( ...args )=> create( 'input', ...args, { type:'date', } ).empty(),
	month:    ( ...args )=> create( 'input', ...args, { type:'month', } ).empty(),
	week:     ( ...args )=> create( 'input', ...args, { type:'week', } ).empty(),
	time:     ( ...args )=> create( 'input', ...args, { type:'time', } ).empty(),
	datetime: ( ...args )=> create( 'input', ...args, { type:'datetime-local', } ).empty(),
	color:    ( ...args )=> create( 'input', ...args, { type:'color', } ).empty(),
	file:     ( ...args )=> create( 'input', ...args, { type:'file', } ).empty(),
	textarea: ( ...args )=> create( 'textarea', ...args, ),
	select:   ( ...args )=> create( 'select', ...args, ),
};

export const button= ( ...args )=> create( 'button', ...args, { type:'button', }, );
button.submit= createLinkTag( 'button', 'formaction', 'click', { type:'submit', }, );

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

function createLinkTag( name, linkName, eventName, ...moreArgs )
{
	return ( ...args )=> {
		const vdom= create( name, ...args, ...moreArgs, );
		
		const link= vdom.getAttribute( linkName, );
		
		if( link instanceof Function )
			vdom.addListener( eventName, e=> {
				if( link.call( e.target, e, ) )
					e.preventDefault();
			} );
		
		return vdom;
	};
}
