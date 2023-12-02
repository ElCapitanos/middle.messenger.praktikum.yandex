import AuthController from "../controllers/authController";
import store from "../utils/store";
import Router from "../utils/Router";

const pages:Array<string> = ['/password-change', '/messenger', '/sign-up', '/settings', '/500']
const router = new Router();
const toAuth = () => {
    AuthController.getUser().then(() => {
        const path = window.location.pathname;//@ts-ignore
        const user = store.getState().currentUser;
        if (!user.id) router.go('/');
        if (path !== '/' && !pages.includes(path)) router.go('/404');
        if (path === '/' && user.id) router.go('/messenger');
      });
}

export default toAuth;
