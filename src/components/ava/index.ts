import ava from './ava.hbs';
import { PropsForComponent } from '../../helpers/constTypes';
import Block from '../../utils/Block';

export default class Ava extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return ava({//@ts-ignore
      class: this.props.class,//@ts-ignore
      src: this.props.src ? this.props.src : 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg',//@ts-ignore
      alt: this.props.alt
    });
  }
}
