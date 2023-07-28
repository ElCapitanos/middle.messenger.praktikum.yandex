import input from './input.hbs';
import password from './inputPassword.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Input extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {//@ts-ignore
    return this.props.inputType !== 'password'
      ? input({//@ts-ignore
        inputType: this.props.inputType,//@ts-ignore
        inputName: this.props.inputName,//@ts-ignore
        placeHolderText: this.props.placeHolderText,//@ts-ignore
        inputId: this.props.inputId,//@ts-ignore
        events: this.props.events
      })
      : password({//@ts-ignore
        inputType: this.props.inputType,//@ts-ignore
        inputName: this.props.inputName,//@ts-ignore
        placeHolderText: this.props.placeHolderText,//@ts-ignore
        inputId: this.props.inputId,//@ts-ignore
        events: this.props.events
      });
  }

  _addEvents() {
    const { events = { } } = this.props;
    this._element?.querySelectorAll('input').forEach((item:any) => {
      for (let e in events)
      item.addEventListener(e, events[e]);
    });
  }
}
