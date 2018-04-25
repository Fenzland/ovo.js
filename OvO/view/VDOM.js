export default class VDOM
{
	constructor( name, )
	{
		this.name= name;
		this.children= [];
		this.attributes= {};
	}
	
	appendChild( child, )
	{
		this.children.push( child, )
	}
	
	setAttribute( attr, value, )
	{
		this.attributes[attr]= value;
	}
}

export function create( name, ...args )
{
	const vdom= new VDOM( name, );
	
	for( let arg of args )
		if( arg instanceof VDOM )
			vdom.appendChild( arg, );
		else
		if( arg.constructor === Object )
			for( let attr in arg )
				vdom.setAttribute( attr, arg[attr], );
		else
		if( typeof arg === 'string' || args.constructor === String )
			vdom.appendChild( new TextNode( arg ), );
}

export function diff( x, y )
{
	
}
