import title from './title.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Title extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {//@ts-ignore
    return title({ text: this.props.text });
  }
}
