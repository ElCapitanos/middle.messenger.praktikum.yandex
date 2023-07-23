import input from './input.hbs';
import Block from './../../utils/Block';
class Input extends Block {
    constructor(props) {
      super("div", props);
    }
    render() {
      return input({ 
        type: this.props.type, 
        name: this.props.name, 
        class: this.props.class, 
        placeHolderText: this.props.placeHolderText
        });
    }
  }
  
  function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }
  
  const newInput = new Input({
    type: 'text',
    name: 'name',
    class: 'input',
    placeHolderText: 'Введите\u00A0имя'
  });
  
  render("#app", newInput);
