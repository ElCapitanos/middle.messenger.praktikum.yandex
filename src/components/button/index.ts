import btn from './button.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

class Button extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return this.compile(btn, {//@ts-ignore
      class: this.props.class,//@ts-ignore
      label: this.props.label,//@ts-ignore
      url: this.props.url,//@ts-ignore
      btnType: this.props.type,//@ts-ignore
      id: this.props.id,//@ts-ignore
      disabledBtn: this.props.disabledBtn ? this.props.disabledBtn : ''
    });
  }
}

export default Button;
