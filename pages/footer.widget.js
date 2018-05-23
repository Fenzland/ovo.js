import router from '../routes/index.js';
import Widget from '../OvO/view/Widget.js';
import { escapeFree as ef, } from '../OvO/view/TextNode.js';
import HTML, { footer, a, button, } from '../OvO/view/HTML.js';
import Listener from '../OvO/view/Listener.js';

import { themes, switchTheme, } from '../themeSwitcher.js'

export default new Widget( {
	
	render()
	{
		return footer(
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
	},
	
}, );
