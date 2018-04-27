export default class TextNode
{
	constructor( content )
	{
		this.content= content;
	}
	
	toString()
	{
		return this.content;
	}
	
	toDOM( document, )
	{
		return new Text( this.content, );
	}
}
