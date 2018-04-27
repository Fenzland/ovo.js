import Router from '../OvO/routing/Router.js';

const router= new Router();

router.route( 'home', '/', '/pages/index', );
router.route( 'introduce', '/introduce', '/pages/introduce', );

export default router;
