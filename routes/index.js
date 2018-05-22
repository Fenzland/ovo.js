import Router from '../OvO/routing/Router.js';
import { currentDir, resolve, } from '../OvO/support/path.js';

const router= new Router();

const dir= currentDir();

router.pageDir= resolve( currentDir(), '../pages', );
router.basePath= resolve( currentDir(), '..', );

router.route( 'home', '/', 'index', );
router.route( 'introduce', '/introduce', );
router.route( 'model', '/model', );
router.route( 'model-demo', '/model-demo', );

export default router;
