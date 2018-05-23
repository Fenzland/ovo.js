import Router from '../OvO/routing/Router.js';
import { resolveHere, } from '../OvO/support/path.js';

const router= new Router();

router.pageDir= resolveHere( '../pages', );
router.basePath= resolveHere( '..', );

router.route( 'home', '/', 'index', );
router.route( 'introduce', '/introduce', );
router.route( 'model', '/model', );
router.route( 'model-demo', '/model-demo', );

export default router;
