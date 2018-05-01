import router from '../routes/index.js';
import HTML, { nav, a, } from '../OvO/view/HTML.js';

export default nav(
	a(
		{ href:router.linkTo( 'home', ), },
		'Home',
	),
	a(
		{ href:router.linkTo( 'introduce', ), },
		'Introduce',
	),
);
