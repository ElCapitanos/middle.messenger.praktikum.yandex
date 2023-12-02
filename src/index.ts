import Router from './utils/Router';
import Auth from './pages/auth';
import PasswordChange from './pages/passwordChange';
import Registration from './pages/registration';
import Chating from './pages/chating';
import Profile from './pages/profile';
import Error404 from './pages/error404';
import Error500 from './pages/error500';

const router:any = new Router('#app');

window.addEventListener('DOMContentLoaded', async () => {
  router.use('/', Auth);
  router.use('/password-change', PasswordChange);
  router.use('/messenger', Chating);
  router.use('/sign-up', Registration);
  router.use('/settings', Profile);
  router.use('/404', Error404);
  router.use('/500', Error500);
  router.start();
});
