import Model from '../model/Model.js';

const CONTENT= Symbol( 'content', );
const DOM= Symbol( 'dom', );

export default class TextNode
{
	constructor( content )
	{
		if( content instanceof Model )
		{
			content.listenedBy( content=> this.updateContent( content, ), );
			
			this.updateContent( content.valueOf(), );
		}
		else
		{
			this.updateContent( content, );
		}
	}
	
	toHTML()
	{
		const dom= document.createElement( 'span', );
		
		dom.innerText= this[CONTENT];
		
		return dom.innerHTML;
	}
	
	updateContent( content, )
	{
		this[CONTENT]= `${content}`;
		
		if( this[DOM] )
		{
			this[DOM].data= this.toString();
		}
	}
	
	toDOM( document, )
	{
		return this[DOM]= new Text( this.toString(), );
	}
	
	toString()
	{
		return this[CONTENT];
	}
}

export class EscapeFreeTextNode extends TextNode
{
	constructor( content, )
	{
		super( content, );
	}
	
	toHTML()
	{
		return this[CONTENT];
	}
	
	toString()
	{
		const dom= document.createElement( 'span', );
		
		dom.innerHTML= this[CONTENT];
		
		return dom.innerText;
	}
}

export function escapeFree( content, )
{
	return new EscapeFreeTextNode( content, );
}
