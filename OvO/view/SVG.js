import { create, } from './VDOM.js';

export default new Proxy( {}, {
	
	get( target, key, receiver, )
	{
		return ( ...args )=> create( key, ...args );
	},
	
	apply( target, context, args, )
	{
		return create( ...args );
	},
}, )
