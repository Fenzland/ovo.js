import Page from '../OvO/view/Page.js';
import Listener from '../OvO/view/Listener.js';
import { If, ForEach, } from '../OvO/view/Ctrl.js';
import Model from '../OvO/model/Model.js';
import HTML, { header, main, form, fieldset, legend, label, input, button, h1, dl, dt, dd, table, caption, thead, tbody, tr, th, td, } from '../OvO/view/HTML.js';
import wait from '../OvO/support/wait.js';
import $navs from './navs.widget.js';
import $footer from './footer.widget.js';
import $sorter from './sorter.component.js';
import Planet from '../resources/Planet.js';


export default new Page( {
	name: 'model-demo',
	
	render()
	{
		const m= new Model( {
			title: '',
			username: '',
			password: '',
			repeating: '',
		}, );
		
		const planets= Planet.query();
		
		(async ( str, interval, )=> {
			for( let i= 0; i <= str.length; ++i )
			{
				m.title= str.slice( 0, i, ) + '.';
				
				await wait( interval, );
			}
		})( 'OvO view model demo', 250, );
		
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
										{ placeholder: m.username.express( x=> x?`Password of ${x}`:'', ), },
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
					caption( 'Planets (', planets.length, ')', ),
					thead(
						tr(
							th( 'index', ),
							Planet.fields.mapValues( ( name, field, )=> [
								th(
									field.label,
									$sorter( planets, name, ),
								),
							], ),
							th( 'actions', ),
						),
					),
					tbody(
						ForEach( planets, ( planet, i, )=> [
							tr(
								td( i, ),
								Planet.fields.mapValues( ( name, field, )=> [
									td( planet[name], ),
								] ),
								td(
									button(
										new Listener( 'click', e=> planets.remove( planet, ), ),
										'remove',
									),
								),
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
