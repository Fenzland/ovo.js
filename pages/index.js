import Page from '../OvO/view/Page.js';
import { header, section, main, div, h1, a, } from '../OvO/view/HTML.js';
import SVG from '../OvO/view/SVG.js';
import router from '../routes/index.js';

// Create a PAGE
export default new Page( {
	
	name: 'index',
	
	// via template
	// 
	template: `Hello World.`,
	templateLanguage: 'htsl',
	
	// via render function
	// 
	render()
	{
		// return a VDOM
		return section(
			
			// pass a VDOM instance as a child.
			header(
				
				// pass a string as innerHTML.
				h1( 'Home Page', ),
			),
			main(
				div(
					// pass a pure Object to set attributes.
					{ class:'logo' },
					
					// svg are supported too.
					SVG.svg(
						{ viewPort:'0,0,256,256', width:'256', height:'256', },
						SVG.path( { d:'M0 0 h256 l -128 128 z', }, ),
						SVG.circle( { cx:'64', cy:'128', r:'48', }, ),
						SVG.circle( { cx:'192', cy:'128', r:'48', }, ),
					),
				),
				a(
					{ href:router.linkTo( 'introduce', ), },
					'Introduce',
				)
			),
		);
	},
	
} );
