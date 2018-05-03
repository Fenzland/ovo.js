import router from '../routes/index.js';
import Widget from '../OvO/view/Widget.js';
import { escapeFree as ef, } from '../OvO/view/EscapeFreeTextNode.js';
import HTML, { footer, a, } from '../OvO/view/HTML.js';

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
		);
	},
	
}, );
