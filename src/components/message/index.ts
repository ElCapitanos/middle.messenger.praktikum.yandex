import message from './message.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes'

export default class Message extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return message({
      class: this.props.class,
      text: this.props.text,
      time: this.props.time
    });
  }
}
