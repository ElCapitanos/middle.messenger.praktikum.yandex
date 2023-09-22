import set from '../helpers/set';
import EventBus from './EventBus';
import StoreEvents from './StoreEvents';

export class Store extends EventBus {
  private state:object = {};

  public set(path:string, data:any) {
    set(this.state, path, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export default store;
