import { h1, button, style, } from '../OvO/view/HTML.js';
import { onClick, } from '../OvO/view/Listener.js';
import { escapeFree as ef, } from '../OvO/view/TextNode.js';
import Session from '../OvO/support/session.js';
import css_layout from '../layouts/user.css.js';

const session= Session( 'auth', );

export function render( { router, }, )
{
	const user= session.get( 'user', );
	
	return [
		style( ef( css_layout, ), ),
		h1( 'welcome ', user.username, ),
		button( 'logout', onClick( logout, ), )
	];
	
	function logout()
	{
		session.del( 'user', );
		router.reload();
	}
}
