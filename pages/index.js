import HTML, { header, footer, section, article, main, div, h1, h2, p, small, a, } from '../OvO/view/HTML.js';
import { escapeFree as ef, } from '../OvO/view/TextNode.js';
import SVG from '../OvO/view/SVG.js';
import router from '../routes/index.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';
import { summary as $introduce, } from './introduce.js';
import { summary as $model, } from './model.js';
import css_layout from '../layouts/home.css.js';

export function render()
{
	// return a VDOM or Array of VDOMs
	return [
		
		// pass a VDOM instance as a child.
		
		// pass a string as innerHTML.
		HTML.title( 'Home - OvO', ),
		
		// pass a pure Object to set attributes.
		// call method empty() to declare a empty tag.
		// HTML.link( { rel:'stylesheet', type:'text/css', href:'/layouts/home.css', }, ).empty(),
		HTML.style( ef( css_layout, ), ),
		
		header(
			div(
				{ class:'logo', },
				
				// both html and svg are supported.
				SVG.svg(
					{ viewBox:'0,0,512,256', },
					SVG.path( { d:'M 128 128 h 96 l 32 32 l 32 -32 h 96 l -128 128 z', fill:'hsla(0,80%,75%,1)', }, ),
					SVG.circle( { cx:'128', cy:'128', r:'96', fill:'hsla(0,100%,80%,1)', }, ),
					SVG.circle( { cx:'384', cy:'128', r:'96', fill:'hsla(0,100%,80%,1)', }, ),
				),
			),
			$navs,
		),
		main(
			article(
				$introduce,
				footer(
					a(
						{ href:router.linkTo( 'introduce', ), },
						'>>> Read More',
					),
				),
			),
			article(
				h1( 'Model', ),
				$model,
				footer(
					a(
						{ href:router.linkTo( 'model', ), },
						'>>> Read More',
					),
					ef( '&ensp;', ),
					a(
						{ href:router.linkTo( 'model-demo', ), },
						'Demo',
					),
				),
			),
		),
		$footer,
	];
}
