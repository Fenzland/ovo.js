import { form, fieldset, legend, label, input, button, style, } from '../OvO/view/HTML.js';
import { onClick, } from '../OvO/view/Listener.js';
import { escapeFree as ef, } from '../OvO/view/TextNode.js';
import Storage from '../OvO/support/Storage.js';
import Session from '../OvO/support/session.js';
import css_layout from '../layouts/login.css.js';

const storage= new Storage( localStorage, `OvO:<auth>`, );
const session= Session( 'auth', );

export function render( { router, }, )
{
	if( session.has( 'user', ) )
		router.reload();
	
	return [
		style( ef( css_layout, ), ),
		form(
			{ action: 'javascript:;', },
			fieldset(
				legend( 'login', ),
				
				label(
					'username ',
					input.text( { name:'username', required:true, }, ),
				),
				label(
					'password ',
					input.password( { name:'password', }, ),
				),
				button.submit(
					'Login',
					onClick( login, )
				),
				' ',
				button.submit(
					'Register',
					onClick( register, )
				),
			),
		),
	];

	function login()
	{
		clearValidity( this.form, );
		
		const username= this.form.elements.username.value;
		const password= this.form.elements.password.value;
		
		const user= storage.get( `users:${username}`, );
		
		if(!( user && user.password===password ))
			return this.form.elements.password.setCustomValidity( 'Username or password incorrect.', );
		
		session.set( 'user', { username, }, );
		
		router.reload();
	}

	function register()
	{
		clearValidity( this.form, );
		
		const username= this.form.elements.username.value;
		const password= this.form.elements.password.value;
		
		const user= storage.get( `users:${username}`, );
		
		if( user )
			return this.form.elements.username.setCustomValidity( 'The username has been token.', );
		
		session.set( 'user', { username, }, );
		storage.set( `users:${username}`, { username, password, }, );
		
		router.reload();
	}
}

function clearValidity( form, )
{
	Array.from( form.elements, ).forEach( input=> input.setCustomValidity( '', ), );
}
