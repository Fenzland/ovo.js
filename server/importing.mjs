import File from './File.mjs';

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
	
	const files= matches[0].match( /'([^']+)';/g, ).map( x=> new File( referenceTo( x.slice( 1, -2, ), file.path, ), ), );
	
	return files.concat( ...files.map( x=> find( x, ), ), );
}

function referenceTo( path, base, )
{
	path= path.split( '/', );
	base= base.split( '/', );
	
	base.pop();
	
	while( true )
		if( path[0]==='..' )
			base.pop(), path.shift();
		else
		if( path[0]==='.' )
			path.shift();
		else
			break;
	
	return base.concat( path, ).join( '/', );
}

function z( x, ...o )
{
	console.log( x, ...o, );
	
	return x;
}
