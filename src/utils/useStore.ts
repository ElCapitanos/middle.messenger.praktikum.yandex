import store from './store';
import isEqualForObj from '../helpers/isEqualForObj';
import Block from './Block';
import StoreEvents from './StoreEvents';
import { Indexed } from '../helpers/constTypes';

function useStore(mapStateToProps: (state:Indexed) => Indexed) {
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
const withUser = useStore((state) => ({ user: state.user }));
export const withChats = useStore((state) => ({ ResultCards: state.chats }))

export default withUser;

