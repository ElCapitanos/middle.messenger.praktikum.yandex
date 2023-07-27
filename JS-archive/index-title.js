import title from './title.hbs';
import Block from '../../utils/Block.ts';

export default class Title extends Block {
    constructor(props) {
        super('div', props);
    }

    render() {
        return title({ text: this.props.text });
    }
}
