import ava from './ava.hbs';
import Block from './../../utils/Block';
export default class Ava extends Block {
    constructor(props) {
      super("div", props);
    }
    render() {
      return ava({ class: this.props.class });
    }
  }
