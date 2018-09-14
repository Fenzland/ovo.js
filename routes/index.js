import Router from '../OvO/routing/Router.js';

const router= new Router( '..', '../pages', );

router.route( 'home', '/', 'index', );
router.route( 'introduce', '/introduce', );
router.route( 'model', '/model', );
router.route( 'model-demo', '/model-demo', );
router.route( 'planet', '/model-demo/planets/{planet:Int}', );

export default router;
