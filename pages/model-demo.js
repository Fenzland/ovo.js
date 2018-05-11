import Page from '../OvO/view/Page.js';
import Listener from '../OvO/view/Listener.js';
import Model from '../OvO/model/Model.js';
import HTML, { header, section, main, form, fieldset, legend, label, input, div, h1, dl, dt, dd, p, } from '../OvO/view/HTML.js';
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
