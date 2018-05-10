import Router from '../OvO/routing/Router.js';

const router= new Router();

router.route( 'home', '/', '/pages/index', );
router.route( 'introduce', '/introduce', '/pages/introduce', );
router.route( 'view-model', '/view-model', '/pages/view-model', );

export default router;
