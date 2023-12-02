import input from './input.hbs';
import password from './inputPassword.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Input extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return this.props.inputType !== 'password'
      ? this.compile(input, {//@ts-ignore
        inputType: this.props.inputType,//@ts-ignore
        inputName: this.props.inputName,//@ts-ignore
        placeHolderText: this.props.placeHolderText,//@ts-ignore
        inputId: this.props.inputId,//@ts-ignore
        events: this.props.events,//@ts-ignore
        class: this.props.class ? this.props.class : 'input'
      })
      : this.compile(password, {//@ts-ignore
        inputType: this.props.inputType,//@ts-ignore
        inputName: this.props.inputName,//@ts-ignore
        placeHolderText: this.props.placeHolderText,//@ts-ignore
        inputId: this.props.inputId,//@ts-ignore
        events: this.props.events,//@ts-ignore
        class: this.props.class ? this.props.class : 'input'
      });
  }

  _addEvents() {//@ts-ignore
    const { events = { } } = this.props;//@ts-ignore
    this._element?.querySelectorAll('input').forEach((item:any) => {
      for (let e in events)//@ts-ignore
      item.addEventListener(e, events[e]);
    });
  }

  _removeEvents() {//@ts-ignore
    const { events = { } } = this.props;//@ts-ignore
    this._element?.querySelectorAll('input').forEach((item:any) => {
      for (let e in events)//@ts-ignore
      item.removeEventListener(e, events[e]);
    });
  }
}
