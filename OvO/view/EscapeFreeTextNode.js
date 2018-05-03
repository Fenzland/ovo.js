const CONTENT= Symbol( 'content', );

export default class EscapeFreeTextNode
{
	constructor( content, )
	{
		this[CONTENT]= content;
	}
	
	toString()
	{
		return this[CONTENT];
	}
	
	toDOM( document, )
	{
		const dom= document.createElement( 'span', );
		
		dom.innerHTML= this[CONTENT];
		
		return new Text( dom.innerText, );
	}
}

export function escapeFree( content, )
{
	return new EscapeFreeTextNode( content, );
}
