import Router from '../OvO/routing/Router.js';
import { resolve, } from '../OvO/support/path.js';

const router= new Router();

router.pageDir= resolve( '../pages', );
router.basePath= resolve( '..', );

router.route( 'home', '/', 'index', );
router.route( 'introduce', '/introduce', );
router.route( 'model', '/model', );
router.route( 'model-demo', '/model-demo', );
router.route( 'planet', '/model-demo/planets/{planet:Int}', );

export default router;
