import btn from './button.hbs'
import Block from '../../utils/Block';
class Button extends Block {
    constructor(props) {
      super("div", props);
    }
    render() {
      return btn({ class: this.props.class, label: this.props.label, url: this.props.url, btnType: this.props.type });
    }
  }
  
  function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }
  
  const button = new Button({
            class: "btn",
            type: 'submit',
            url: '/registration',
            label: 'Ого-го'
  });
  
  render("#app", button);

//   setTimeout(() => {
//     button.setProps({
//       label: 'Не входить!',
//     });
//   }, 3000);
