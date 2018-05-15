import fs from'fs';
import MIME from './MIME.mjs';

export default class File
{
	constructor( path, )
	{
		this.path= path;
		this.buffer= fs.readFileSync( path, );
		this.mime= MIME( path, )
	}
}
