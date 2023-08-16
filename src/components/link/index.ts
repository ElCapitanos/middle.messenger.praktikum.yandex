import link from './link.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Link extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {//@ts-ignore
    return this.compile(link, { url: this.props.url, title: this.props.title, class: this.props.class ? this.props.class : 'link' });
  }
}
