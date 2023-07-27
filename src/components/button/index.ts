import btn from './button.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Button extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return btn({
      class: this.props.class,
      label: this.props.label,
      url: this.props.url,
      btnType: this.props.type,
      id: this.props.id,
      disabled: this.props.disabled
    });
  }
}
