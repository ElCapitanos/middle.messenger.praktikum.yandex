import error from './error.hbs';
import Block from '../../utils/Block.ts';

export default class Error extends Block {
    constructor(props) {
        super('div', props);
    }

    render() {
        return error({ message: this.props.message, errorId: this.props.errorId, errorStyle: this.props.errorStyle });
    }
}