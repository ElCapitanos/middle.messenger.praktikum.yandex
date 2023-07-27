import error from './error.hbs';
import Block from '../../utils/Block';
import { PropsForComponent } from '../../helpers/constTypes'

export default class Error extends Block {
  constructor(props:PropsForComponent) {
    super('div', props);
  }

  render() {//@ts-ignore
    return error({ message: this.props.message, errorId: this.props.errorId, errorStyle: this.props.errorStyle });
  }
}
