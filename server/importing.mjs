import File from './File.mjs';
import path from 'path';

const map= {};

export default function importing( file, )
{
	if( map[file.path] )
	{
		return map[file.path].map( x=> new File( x, ), );
	}
	else
	{
		const list= find( file, );
		
		map[file.path]= list.map( x=> x.path, );
		
		return list;
	}
}

function find( file, )
{
	const matches= file.buffer.toString().match( /^(?:import [^;\n]+;\n)+/, );
	
	if(!( matches )) return [];
	
	const files= matches[0].match( /'([^']+)';/g, ).map( x=> (
		new File(
			path.resolve( path.dirname( file.path, ), x.slice( 1, -2, ), ),
		)
	), );
	
	return files.concat( ...files.map( x=> find( x, ), ), );
}
