import message from './message.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes'

export default class Message extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return this.compile(message, {//@ts-ignore
      class: this.props.class,//@ts-ignore
      text: this.props.text,//@ts-ignore
      time: this.props.time
    });
  }
}
