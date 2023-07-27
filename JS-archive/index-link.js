import link from './link.hbs';
import Block from '../../utils/Block.ts';

export default class Link extends Block {
    constructor(props) {
        super('div', props);
    }

    render() {
        return link({ url: this.props.url, title: this.props.title });
    }
}
