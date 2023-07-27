import ava from './ava.hbs';
import Block from '../../utils/Block.ts';

export default class Ava extends Block {
    constructor(props) {
        super('div', props);
    }

    render() {
        return ava({
            class: this.props.class,
            src: this.props.src ? this.props.src : 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg',
            alt: this.props.alt
        });
    }
}
