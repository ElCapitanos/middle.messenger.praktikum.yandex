import btn from './button.hbs'
import Block from '../../utils/Block';
export default class Button extends Block {
    constructor(props) {
        super("div", props);
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
