import input from "./input.hbs";
import password from "./inputPassword.hbs";
import Block from "./../../utils/Block";
export default class Input extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return this.props.inputType !== "password"
            ? input({
                  inputType: this.props.inputType,
                  inputName: this.props.inputName,
                  placeHolderText: this.props.placeHolderText,
                  inputId: this.props.inputId,
                  events: this.props.events,
              })
            : password({
                  inputType: this.props.inputType,
                  inputName: this.props.inputName,
                  placeHolderText: this.props.placeHolderText,
                  inputId: this.props.inputId,
                  events: this.props.events,
              });
    }
}
