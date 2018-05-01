import Page from '../OvO/view/Page.js';
import { header, section, main, div, h1, a, } from '../OvO/view/HTML.js';
import router from '../routes/index.js';
import navs from './navs.widget.js';

export default new Page( {
	
	name: 'introduce',
	
	render()
	{
		return section(
			header(
				h1( 'Introduce', ),
				navs,
			),
			main(
				'Nothing here, back to ',
				a(
					{ href:router.linkTo( 'home', ), },
					'Home',
				),
				'.',
			),
		);
	},
	
} );
