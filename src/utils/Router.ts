import Route from './Route';

class Router {//@ts-ignore
  routes: Route[];
//@ts-ignore
  history: History;
//@ts-ignore
  _currentRoute: Route | null;
  _rootQuery?: string;
  static instance: Router;

  constructor(rootQuery?: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery || '#app';

    Router.instance = this;
  }

  use(pathname: string, component:any, props:object = {}) {
    const route = new Route(pathname, component, { ...props, rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {//@ts-ignore
      this._onRoute(event.currentTarget?.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
