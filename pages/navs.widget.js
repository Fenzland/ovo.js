import router from '../routes/index.js';
import Widget from '../OvO/view/Widget.js';
import HTML, { nav, a, } from '../OvO/view/HTML.js';

export default new Widget( {
	
	render()
	{
		return nav(
			a(
				{ href:router.linkTo( 'home', ), },
				'Home',
			),
			a(
				{ href:router.linkTo( 'introduce', ), },
				'Introduce',
			),
		);
	},
	
}, );
