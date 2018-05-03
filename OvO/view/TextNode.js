const CONTENT= Symbol( 'content', );

export default class TextNode
{
	constructor( content )
	{
		this[CONTENT]= content;
	}
	
	toString()
	{
		const dom= document.createElement( 'span', );
		
		dom.innerText= this[CONTENT];
		
		return dom.innerHTML;
	}
	
	toDOM( document, )
	{
		return new Text( this[CONTENT], );
	}
}
