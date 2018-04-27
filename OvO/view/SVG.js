import { createNS, } from './VDOM.js';

const namespace= 'http://www.w3.org/2000/svg';

export default new Proxy( {}, {
	
	get( target, key, receiver, )
	{
		return ( ...args )=> createNS( namespace, key, ...args );
	},
	
	apply( target, context, args, )
	{
		return createNS( namespace, ...args );
	},
}, )
