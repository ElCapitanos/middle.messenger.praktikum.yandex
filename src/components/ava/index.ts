import ava from './ava.hbs';
import { PropsForComponent } from '../../helpers/constTypes';
import Block from '../../utils/Block';

export default class Ava extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return this.compile(ava, {
      class: this.props.class,
      textClass: this.props.textClass,
      src: this.props.src ? this.props.src : 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg',
      alt: this.props.alt
    });
  }
}
