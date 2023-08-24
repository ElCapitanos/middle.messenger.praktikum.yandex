import Block from './Block';
import isEqual from './isEqual';
import renderApp from './renderApp';
import clearApp from './clearApp';
import { Constructor } from '../helpers/constTypes';

class Route {
  private _pathname:string;
  private _Component:Constructor | null = null;
  private _block:Block | null = null;
  private _props:object = {
    rootQuery: '#app',
  };

  constructor(pathname:string, Component:Constructor, props:object) {
    this._pathname = pathname;
    this._Component = Component;
    this._block = null;
    this._props = props;
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {//@ts-ignore
      clearApp(this._props.rootQuery);
    }
  }

  match(pathname:string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      if (!this._Component) throw new Error('Элемент не найден');//@ts-ignore
      this._block = new this._Component(this._props);
    }//@ts-ignore
    renderApp(this._props.rootQuery, this._block);
  }
}

export default Route;
