import Router from '../OvO/routing/Router.js';

const router= new Router();

router.route( {
	home: { path: '/', page: 'index', },
	introduce: '/introduce',
	async: '/async',
	model: '/model',
	model_demo: {
		path: '/model-demo',
		page: 'model-demo',
		follows: {
			planet: {
				path: '/planets/{planet:Int}',
				page: '/planet',
			},
		},
	},
	user: {
		path: '/user',
		gates: [ '/auth/gate', ],
	},
}, );

export default router;
