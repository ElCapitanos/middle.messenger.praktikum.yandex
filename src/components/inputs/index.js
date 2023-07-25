import input from './input.hbs';
import password from './inputPassword.hbs';
import Block from './../../utils/Block';
export default class Input extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return this.props.inputType !== 'password' ? input({
        inputType: this.props.inputType, 
        inputName: this.props.inputName, 
        placeHolderText: this.props.placeHolderText,
        inputId: this.props.inputId,
        events: this.props.events
    }) : password({
        inputType: this.props.inputType, 
        inputName: this.props.inputName, 
        placeHolderText: this.props.placeHolderText,
        inputId: this.props.inputId,
        events: this.props.events
    });
    };

    // _addEvents() {
    //     this.element.querySelectorAll("input").forEach((item) => {
    //         item.addEventListener("focus", (e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             // console.log('/*/*/*/*', e.target)
    //         });
    //     });
    //     super._addEvents();
    //   }
    // _removeEvents() {
    //     this.element.querySelectorAll("input").forEach((item) => {
    //         item.removeEventListener("focus", (e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             console.log('/*/*/*/*', e.target)
    //         });
    //     });
    //     super._removeEvents();
    //   }
}
