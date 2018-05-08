import Page from '../OvO/view/Page.js';
import HTML, { header, footer, section, article, main, div, h1, h2, p, small, a, } from '../OvO/view/HTML.js';
import SVG from '../OvO/view/SVG.js';
import router from '../routes/index.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';
import { summary as $introduce, } from './introduce.js';

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
		// return a VDOM or Array of VDOMs
		return [
			
			// pass a VDOM instance as a child.
			
			// pass a string as innerHTML.
			HTML.title( 'Home - OvO', ),
			
			// pass a pure Object to set attributes.
			// call method empty() to declare a empty tag.
			HTML.link( { rel:'stylesheet', type:'text/css', href:'/layouts/home.css', }, ).empty(),
			
			header(
				div(
					{ class:'logo', },
					
					// both html and svg are supported.
					SVG.svg(
						{ viewBox:'0,0,512,256', },
						SVG.path( { d:'M 128 128 h 96 l 32 32 l 32 -32 h 96 l -128 128 z', fill:'hsl(0,80%,75%)', }, ),
						SVG.circle( { cx:'128', cy:'128', r:'96', fill:'hsl(0,100%,80%)', }, ),
						SVG.circle( { cx:'384', cy:'128', r:'96', fill:'hsl(0,100%,80%)', }, ),
					),
				),
				$navs,
			),
			main(
				article(
					...$introduce,
					footer(
						a(
							{ href:router.linkTo( 'introduce', ), },
							'>>> Read More',
						),
					),
				),
			),
			$footer,
		];
	},
	
}, );
