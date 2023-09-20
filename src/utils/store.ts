import set from '../helpers/set';
import EventBus from './EventBus';
import Block from './Block';
import isEqualForObj from '../helpers/isEqualForObj';

enum StoreEvents {
  Updated = "updated"
}

export class Store extends EventBus {
  private state: object;

  public set(path:string, data:any) {
    set(this.state, path, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function UseStore(mapStateToProps: (state:any) => any) {
  return function (Component: typeof Block) {
    let oldState:any;
    return class UseStore extends Component {
      constructor(props:any) {
        oldState = mapStateToProps(store.getState());
        super({ ...props, ...oldState });
        store.on(StoreEvents.Updated, () => {
          const newProps = mapStateToProps(store.getState());
          if (isEqualForObj(oldState, newProps)) {
            return;
          }
          oldState = newProps;
          this.setProps({ ...newProps });
        });
      }
    };
  };
}

export default store;
