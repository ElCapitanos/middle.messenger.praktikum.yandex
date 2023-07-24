import subtitle from './subtitle.hbs'
import Block from '../../utils/Block';
export default class Subtitle extends Block {
    constructor(props) {
      super("div", props);
    }
    render() {
      return subtitle({ text: this.props.text });
    }
  }