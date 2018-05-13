import Page from '../OvO/view/Page.js';
import Listener from '../OvO/view/Listener.js';
import { If, ForEach } from '../OvO/view/Ctrl.js';
import Model from '../OvO/model/Model.js';
import HTML, { header, main, form, fieldset, legend, label, input, h1, dl, dt, dd, table, caption, thead, tbody, tr, th, td, } from '../OvO/view/HTML.js';
import Pointer from '../OvO/support/Pointer.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';
import planetsData from './planets.data.js';

const m= new Model( {
	title: '',
	username: '',
	password: '',
	repeating: '',
}, );

const planets= new Model( [], );

(( f, ...args )=> f( f, ...args, ) )( ( f, i, arr, p, interval, )=>{
	p.push( arr[i] )
	if( ++i < arr.length )
		setTimeout( ()=> f( f, i, arr, p, interval, ), interval, );
}, 0, planetsData, planets, 250, );


(( f, ...args )=> f( f, ...args, ) )( ( f, i, str, p, interval, )=>{
	p.value= str.slice( 0, i ) + '.';
	if( i < str.length )
		setTimeout( ()=> f( f, ++i, str, p, interval, ), interval, );
	else
		p.value= str + '.';
}, 0, 'OvO view model demo',new Pointer( m, 'title', ), 250, );

export default new Page( {
	name: 'view-model',
	
	render()
	{
		return [
			header(
				h1( m.title, { style:'font-family:monospace;', } ),
				$navs,
			),
			main(
				form(
					fieldset(
						legend( 'Model Binding', ),
						dl(
							label(
								dt( 'Username', ),
								dd(
									input.text(
										new Listener( 'input', e=> m.username=e.target.value ),
									),
									m.username.express( x=> checkUsername( x, ), ),
								),
							),
							label(
								dt( 'Password', ),
								dd(
									input.password(
										new Listener( 'input', e=> m.password=e.target.value ),
									),
									m.password.express( x=> checkPassword( x, ), ),
								),
							),
							If( m.password, ).then(
								label(
									dt( 'Repeat Password', ),
									dd(
										input.password(
											new Listener( 'input', e=> m.repeating=e.target.value ),
										),
										Model.express(
											( x, y, )=> checkRepeating( x, y, ),
											m.password,
											m.repeating,
										),
									),
								),
							),
						),
					),
				),
				table(
					caption( 'Planets', ),
					thead(
						tr(
							th( 'id', ),
							th( 'name', ),
							th( 'mass', ),
							th( 'diameter', ),
							th( 'semi-major axis', ),
							th( 'orbital period', ),
							th( 'orbital eccentricity', ),
							th( 'rotation period', ),
							th( 'moons', ),
						),
					),
					tbody(
						ForEach( planets, planet=>[
							tr(
								td( planet.id, ),
								td( planet.name, ),
								td( planet.mass, ),
								td( planet.diameter, ),
								td( planet.semi_major_axis, ),
								td( planet.orbital_period, ),
								td( planet.orbital_eccentricity, ),
								td( planet.rotation_period, ),
								td( planet.moons, ),
							),
						], ),
					),
				),
			),
			$footer,
		];
	}
} );


function checkUsername( username, )
{
	if(!( username ))
		return '';
	
	if( username.length < 4 )
		return ' Username is to short.';
	
	if(!( /^[a-zA-Z_]\w*$/.test( username, ) ))
		return ' Only use "A-Z", "a-z", "0-9", "_" and not start with numbers.';
	
	const fakeOnlineChack= new Promise(
		( resolve, reject, )=> {
			setTimeout( ()=> (
				Math.random() > 0.3
				? resolve( ` Username "${username}" is valid`, )
				: reject()
			), 400, );
		},
	);
	
	fakeOnlineChack.temp= ' Online chacking...';
	fakeOnlineChack.rejected= ' Connection Error.';
	
	return fakeOnlineChack;
}

function checkPassword( password, )
{
	if(!( password ))
		return '';
	
	if( password.length < 8 )
		return ' Password is to short.';
	
	if(
		/^[a-z]*$/.test( password, )
	||
		/^[0-9]*$/.test( password, )
	||
		/^[A-Z]*$/.test( password, )
	)
		return ' Password is too simple.';
	
	return ` OK.`;
}

function checkRepeating( password, repeating, )
{
	if(!( repeating ))
		return '';
	else
	if( password !== repeating )
		return ' Passwords unpaired.';
	else
		return ' OK.';
}
