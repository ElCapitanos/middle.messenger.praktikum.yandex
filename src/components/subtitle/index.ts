import subtitle from './subtitle.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Subtitle extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {//@ts-ignore
    return this.compile(subtitle, { text: this.props.text });
  }
}
