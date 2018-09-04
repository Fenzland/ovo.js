import { createNS, } from './VDOM.js';

const namespace= 'http://www.w3.org/2000/svg';

const Tags= {
	a: createLinkTag( 'a', 'href', 'click', ),
};

function createLinkTag( name, linkName, eventName, ...moreArgs )
{
	return ( ...args )=> {
		const vdom= createNS( namespace, name, ...args, ...moreArgs, );
		
		const link= vdom.getAttribute( linkName, );
		
		if( link instanceof Function )
			vdom.addListener( eventName, e=> {
				if( link.call( e.target, e, ) )
					e.preventDefault();
			} );
		
		return vdom;
	};
}


export default new Proxy( {}, {
	
	get( target, key, receiver, )
	{
		if( Tags.hasOwnProperty( key, ) )
			return Tags[key];
		else
			return ( ...args )=> createNS( namespace, key, ...args );
	},
	
	apply( target, context, args, )
	{
		return createNS( namespace, ...args );
	},
}, );

export const a= Tags.a;
