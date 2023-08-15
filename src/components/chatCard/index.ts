import card from './chatCard.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Card extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return this.compile(card, {//@ts-ignore
      name: this.props.name,//@ts-ignore
      date: this.props.date,//@ts-ignore
      ava: this.props.ava ? this.props.ava : 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg',//@ts-ignore
      amount: this.props.amount,//@ts-ignore
      text: this.props.text,//@ts-ignore
      queu: this.props.amount ? 'display:block;' : 'display:none;',//@ts-ignore
      active: this.props.active ? 'background-color:rgba(0,0,0,.15);' : ''
    });
  }
}
