import { header, footer, main, article, h1, h2, p, a, code, } from '../OvO/view/HTML.js';
import { Await, } from '../OvO/view/Ctrl.js';
import wait from '../OvO/support/wait.js';
import router from '../routes/index.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';

const contents= [
	h2( 'Summary', ),
	p(
		'OvO support several features for asynchronizations. ',
		'Values of text nodes can be promises, attributes of VDOMs can be promises, even VDOMs themself can be promises. ',
	),
];

export function render()
{
	return [
		header(
			h1( 'Model', ),
			$navs,
		),
		main(
			article(
				Await(
					wait( 1000, ).then( ()=> contents, ),
					'Loading...',
				),
				footer(
					a(
						{ href:'javascript:history.back();', },
						'<<< Back Home',
					),
				),
			),
		),
		$footer,
	];
}

export const summary= contents.slice( 1, 2, );
