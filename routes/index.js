import Router from '../OvO/routing/Router.js';

const router= new Router( '..', '../pages', );

router.route( {
	home: { path: '/', page: 'index', },
	introduce: '/introduce',
	model: '/model',
	model_demo: {
		path: '/model-demo',
		page: 'model-demo',
		follow: {
			planet: {
				path: '/planets/{planet:Int}',
				page: '/planet',
			},
		},
	}
}, );

export default router;
