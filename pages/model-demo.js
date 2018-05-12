import Page from '../OvO/view/Page.js';
import Listener from '../OvO/view/Listener.js';
import { If, } from '../OvO/view/Ctrl.js';
import Model from '../OvO/model/Model.js';
import HTML, { header, main, form, fieldset, legend, label, input, h1, dl, dt, dd, table, caption, thead, tbody, tr, th, td, } from '../OvO/view/HTML.js';
import Pointer from '../OvO/support/Pointer.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';

const m= new Model( {
	title: '',
	username: '',
	password: '',
	repeating: '',
}, );

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
						tr(
							td( 1, ),
							td( 'Mercury', ),
							td( 0.06, ),
							td( 0.382, ),
							td( 0.39, ),
							td( 0.24, ),
							td( 0.206, ),
							td( 58.64, ),
							td( 0, ),
						),
						tr(
							td( 2, ),
							td( 'Venus', ),
							td( 0.82, ),
							td( 0.949, ),
							td( 0.72, ),
							td( 0.62, ),
							td( 0.007, ),
							td( -243.02, ),
							td( 0, ),
						),
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
