import Page from '../OvO/view/Page.js';
import { header, section, main, div, h1, } from '../OvO/view/HTML.js';
import SVG from '../OvO/view/SVG.js';

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
						{ viewPort:'0,0,512,512', },
						SVG.path( { d:'M0 0, v512, h512, z', }, ),
						SVG.circle( {}, ),
						SVG.circle( {}, ),
					),
				),
			),
		);
	},
	
} );
