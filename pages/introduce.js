import Page from '../OvO/view/Page.js';
import { header, footer, main, article, div, h1, h2, p, small, a, } from '../OvO/view/HTML.js';
import router from '../routes/index.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';

const contents= [
	h1( 'OvO.js', small( ' a little toy js framework.', ), ),
	p(
		'I\'m trying to discover a new mode of web application project or framewark. Maybe just for futrue. ',
		'Use ES6 module and don\'t care of old browsers (or explorers looks like broken browsers). ',
		'Reject bundlers and transpilers. Let modules separate and achieve demand loading. ',
	),
	h2( 'Routing', ),
	p(
		'An instance of Router manages the routing of the app, which listens window.location and event ',
		'popstate@window and dispatch routes. You can define routes via Router.prototype.route(). ',
		'A name, a path pattern, and a page url are required. The name is a index to the route, ',
		'usually use to build links to the route. The pattern use to match url to route. The page ',
		'url tells where is the page resource, which will be loaded asynchronously when the route active. ',
		'To jump between routes, you need create hyperlink component, or known as <a>, with a instance ',
		'of Link as "href" attribute. When it\'s clicked, a soft jump to the goal route will be launched. ',
		'On the other hand, when an <a> with a string "href" is clicked, a hard jump will be launched. ',
		'There is an instance of History, a self-built history object inside the router. ',
		'This provides complete accessibility of history tree, instead of the unreadable, ',
		'uncontrollable native BOM history. ',
	),
	h2( 'Views', ),
	p(
		'There are 3 different level of view objects: page, widget, and component. ',
		'Pages are objects use for routing. A route is built with a page, one-to-one. ',
		'(But different routes can be built with the same page of cause.) ',
		'Widgets are parts of page which need to be encapsulated for reusing. ',
		'Components are the molecules of pages and widgets. The basic components, Actually, are DOMs. ',
		'Costom components are built with Standard Web Component, but with more friendly apis. ',
		'It\'s necessary to make distinctions between widgets and components. ',
		'Components are global, stateless, contextless, content free, and business free. ',
		'Such as a wonderful waving button, a brilliant date picker, or an annoying popup dialog. ',
		'Widgets can hold stats, contact with context, include contents, handle businesses. ',
		'Such as a user info kit, a message list, a slidable banner, a login form... ',
		'A widget owns lifecycle stand alone from the one of page. ',
		'When the router jump from one page to another, a widget both in two pages ',
		'will keep alive without any change, a widget only in first page will fell asleep ',
		'and keep an single instance with key infos or states, wating for using again. ',
	),
];

export default new Page( {
	
	name: 'introduce',
	
	render()
	{
		return [
			header(
				h1( 'Introduce', ),
				$navs,
			),
			main(
				article(
					...contents,
					footer(
						a(
							// Todo make a link with a state as href to travel history.
							{ href:'javascript:history.back();', },
							'<<< Back Home',
						),
					),
				),
			),
			$footer,
		];
	},
	
} );

export const summary= contents.slice( 0, 2, );
