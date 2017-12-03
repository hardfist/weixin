import koaRouter from 'koa-router';
import authController from '../controllers/authController';
const router = koaRouter();

router.get('/', authController.auth);
router.post('/',authController.echo);
export default router;