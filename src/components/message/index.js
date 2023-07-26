import message from './message.hbs';
import Block from './../../utils/Block';
export default class Message extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return message({
            class: this.props.class,
            text: this.props.text,
            time: this.props.time
        })

    }
}
