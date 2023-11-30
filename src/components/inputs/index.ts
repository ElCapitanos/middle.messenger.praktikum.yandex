import input from './input.hbs';
import password from './inputPassword.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes';

export default class Input extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {
    return this._props.inputType !== 'password'
      ? this.compile(input, {//@ts-ignore
        inputType: this._props.inputType,//@ts-ignore
        inputName: this._props.inputName,//@ts-ignore
        placeHolderText: this._props.placeHolderText,//@ts-ignore
        inputId: this._props.inputId,//@ts-ignore
        events: this._props.events,//@ts-ignore
        class: this._props.class ? this._props.class : 'input'
      })
      : this.compile(password, {//@ts-ignore
        inputType: this._props.inputType,//@ts-ignore
        inputName: this._props.inputName,//@ts-ignore
        placeHolderText: this._props.placeHolderText,//@ts-ignore
        inputId: this._props.inputId,//@ts-ignore
        events: this._props.events,//@ts-ignore
        class: this._props.class ? this._props.class : 'input'
      });
  }

  _addEvents() {//@ts-ignore
    const { events = { } } = this._props;//@ts-ignore
    this._element?.querySelectorAll('input').forEach((item:any) => {
      for (let e in events)//@ts-ignore
      item.addEventListener(e, events[e]);
    });
  }

  _removeEvents() {//@ts-ignore
    const { events = { } } = this._props;//@ts-ignore
    this._element?.querySelectorAll('input').forEach((item:any) => {
      for (let e in events)//@ts-ignore
      item.removeEventListener(e, events[e]);
    });
  }
}
