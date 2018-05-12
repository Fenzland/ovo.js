import Page from '../OvO/view/Page.js';
import { header, footer, main, article, div, h1, h2, p, small, a, code, } from '../OvO/view/HTML.js';
import router from '../routes/index.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';

const contents= [
	h2( 'Summary', ),
	p(
		'In OvO, models are nestable data containers, usually created by ', code( 'new Model( data, )', ), '. ',
		'It observes data changes and dispatches events. ',
		'The view using models will listen those events and make changes. ',
	),
	h2( 'Scalar models', ),
	p(
		'If the value of a model is not an object, the model will be a scalar model. ',
		'You can set value with method ', code( '.setValue()', ), ', get current value with method ', code( '.valueOf()', ),
		', and as usual, use it in view directly. ( Don\'t use ', code( '.valueOf()', ),
		' in the view, returning value of this method will never change the view. ) ',
	),
	h2( 'Nested models', ),
	p(
		'In most cases, our data are not a simple scalar, but an object with scalar or objective values as properties. ',
		'Creating a model with an object, obtains a nested model. Access to it\'s properties, we get sub-models. ',
		'With nested model, we can just set properties instead of calling ', code( '.setValue()', ), ' of sub-models. ',
	),
	h2( 'Expression model', ),
	p(
		'Some times, we don\'t want to use model value in view directly, but with in a expression. ',
		'We can create a expression model with a model or several models. ',
		'Expression models are instances of ', code( 'class Model', ),' too, which created by ',
		code( 'Model.express( callback, ...models )', ), ' and ',
		code( 'Model.prototype.express( callback, )', ), '. ',
		'When each model use within has changed, the expression model changes.',
	),
	h2( 'Promises as values', ),
	p(
		'Most of web processes are async. So promises are everywhere. ',
		'With models of OvO, you just treat them as normal values. ',
		'A model with promise as value will delay change until the promise is resolved. ',
		'If you want to give a temporary value before the promise is resolved, ',
		'you can set it to property ', code( '.temp', ), ' of the promise object. ',
		'And if you want to give a fallback value, in cace of rejection, ',
		'just set it to property ', code( '.rejected', ), ' of the promise object. ',
	),
];

export default new Page( {
	
	name: 'introduce',
	
	render()
	{
		return [
			header(
				h1( 'Model', ),
				$navs,
			),
			main(
				article(
					contents,
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

export const summary= contents.slice( 1, 2, );
