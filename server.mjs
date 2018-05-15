import http2 from'http2';
import fs from'fs';
import File from './server/File.mjs';
import importing from './server/importing.mjs';

const server= http2.createSecureServer( {
	key: fs.readFileSync( '../localhost.key', ),
	cert: fs.readFileSync( '../localhost.cer', ),
}, );

server.on( 'error', ( err, ) => console.error( err, ), );

server.on( 'stream', ( stream, headers, )=> {
	const pwd= process.cwd();
	const path= headers[':path'];
	let filePath= pwd + path + (path.slice( -1, )==='/'? 'index.html' : '' );
	
	if(!( fs.existsSync( filePath, ) ))
	{
		filePath= pwd + '/index.html';
	}
	
	const file= new File( filePath, );
	
	sendFile( stream, file, );
	
	if( file.mime==="application/x-javascript" && stream.pushAllowed )
	{
		for( let imported of importing( file, ) )
		{
			stream.pushStream(
				{ ':path': imported.path.slice( pwd.length, ), },
				( err, pushStream, headers, )=> {
					if( err ) throw err;
					
					sendFile( pushStream, imported, );
				},
			);
		}
	}
} );

server.listen( 8443, );

function sendFile( stream, file, )
{
	stream.respond( {
		'content-type': file.mime,
		':status': 200,
	}, );
	stream.end( file.buffer, );
	
}

function z( x, ...o )
{
	console.log( x, ...o, );
	
	return x;
}
