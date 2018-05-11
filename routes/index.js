import Router from '../OvO/routing/Router.js';

const router= new Router();

router.route( 'home', '/', '/pages/index', );
router.route( 'introduce', '/introduce', '/pages/introduce', );
router.route( 'model', '/model', '/pages/model', );
router.route( 'model-demo', '/model-demo', '/pages/model-demo', );

export default router;
