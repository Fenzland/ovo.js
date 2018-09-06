import { header, main, article, div, h1, h2, dl, dt, dd, } from '../OvO/view/HTML.js';
import Planet from '../resources/Planet.js';
import router from '../routes/index.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';
import { resolve, } from '../OvO/support/path.js';

export function render( { params, }, )
{
	const planet= Planet.find( params.planet, );
	
	return [
		header(
			h1( planet.name, ),
			$navs,
		),
		main(
			article(
				dl(
					Planet.fields.mapValues( ( name, field, )=> [
						dt( name, ),
						dd( planet[name], ),
					], )
				),
			),
		),
		$footer,
	];
}
