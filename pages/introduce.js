import Page from '../OvO/view/Page.js';
import { header, main, article, div, h1, a, } from '../OvO/view/HTML.js';
import router from '../routes/index.js';
import navs from './navs.widget.js';
import footer from './footer.widget.js';

export default new Page( {
	
	name: 'introduce',
	
	render()
	{
		return [
			header(
				h1( 'Introduce', ),
				navs,
			),
			main(
				article(
					'Nothing here, back to ',
					a(
						{ href:router.linkTo( 'home', ), },
						'Home',
					),
					'.',
				),
			),
			footer,
		];
	},
	
} );
