import Error404 from './pages/error404';
import Error500 from './pages/error500';
import Auth from './pages/auth';
import PasswordChange from './pages/passwordChange';
import Router from './utils/Router';


const router:any = new Router('#app');

window.addEventListener("DOMContentLoaded", () => {
  router.use("/", Auth);
  router.use("/psw", PasswordChange);
  router.use("/500", Error500);
  router.use("/404", Error404);
  router.start()
})
  