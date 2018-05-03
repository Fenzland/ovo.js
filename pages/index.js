import Page from '../OvO/view/Page.js';
import HTML, { header, section, article, main, div, h1, h2, p, small, } from '../OvO/view/HTML.js';
import SVG from '../OvO/view/SVG.js';
import navs from './navs.widget.js';
import footer from './footer.widget.js';

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
				navs,
			),
			main(
				article(
					h1( 'OvO.js', small( ' a little toy js framework.', ), ),
					p( 'I\'m trying to discover a new mode of web application project or framewark. Maybe just for futrue. Use ES6 module and don\'t care of old browsers (or explorers looks like broken browsers). Reject bundlers and transpilers. Let modules separate and achieve demand loading. ', ),
					h2( 'Routing', ),
					p(
						'An instance of Router manages the routing of the app, which listens window.location and event window.@popstate and dispatch routes. ',
						'You can define routes via Router.prototype.route(). A name, a path pattern, and a page url are required. ',
						'The name is a index to the route, usually use to build links to the route. The pattern use to match url to route. The page url tells where is the page resource, which will be loaded asynchronously when the route active. ',
						'To jump between routes, you need create hyperlink component, or known as <a>, with a instance of Link as "href" attribute. When it\'s clicked, a soft jump to the goal route will be launched. On the other hand, when an <a> with a string "href" is clicked, a hard jump will be launched. ',
						'There is an instance of History, a self-built history object inside the router. This provides complete accessibility of history tree, instead of the unreadable, uncontrollable native BOM history. ',
					),
					h2( 'Views', ),
					p(
						'There are 3 different level of view objects: page, widget, and component. ',
						'Pages are objects use for routing. A route is built with a page, one-to-one. (But different routes can be built with the same page of cause.) ',
						'Widgets are parts of page which need to be encapsulated for reusing. ',
						'Components are the molecules of pages and widgets. The basic components, Actually, are DOMs. Costom components are built with Standard Web Component, but with more friendly apis. ',
						'It\'s necessary to make distinctions between widgets and components. Components are global, stateless, contextless, content free, and business free. Such as a wonderful waving button, a brilliant date picker, or an annoying popup dialog. ',
						'Widgets can hold stats, contact with context, include contents, handle businesses. Such as a user info kit, a message list, a slidable banner, a login form... ',
						'A widget owns lifecycle stand alone from the one of page. When the router jump from one page to another, a widget both in two pages will keep alive without any change, a widget only in first page will fell asleep and keep an single instance with key infos or states, wating for using again. ',
					),
				),
			),
			footer,
		];
	},
	
}, );
