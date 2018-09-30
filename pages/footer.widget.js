import router from '../routes/index.js';
import { escapeFree as ef, } from '../OvO/view/TextNode.js';
import HTML, { div, footer, a, button, } from '../OvO/view/HTML.js';
import { ForEach, } from '../OvO/view/Ctrl.js';
import Listener from '../OvO/view/Listener.js';

import { themes, switchTheme, } from '../themeSwitcher.js'

export default footer(
	a(
		{ href: router.backTo( 'home', ), },
		router.history.current,
	),
	div(
		ForEach( router.history.states, state=> div( state.offset, ' <', state.route, '> ', state.url, ), ),
	),
	ef( '&copy;', ),
	' Fenz (',
	a(
		{ href:'mailto:uukoo@163.com', },
		'uukoo@163.com',
	),
	')',
	ef( '&emsp;', ),
	themes.map( theme=> [
		ef( '&ensp;', ),
		button(
			{
				style: /*CSS{}*/`
					background-color: ${theme.color};
					border-color: hsla(0,0%,100%,1);
					width: 1em;
					height: 1em;
					vertical-align: button;
				`,
			},
			new Listener( 'click', e=> switchTheme( theme.name, ), )
		),
	], ),
);
