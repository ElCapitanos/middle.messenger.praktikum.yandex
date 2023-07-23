import ava from './ava.hbs';
import Block from './../../utils/Block';
class Ava extends Block {
    constructor(props) {
      super("div", props);
    }
    render() {
      return ava({ class: this.props.class });
    }
  }
  
  function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }
  
  const newAva = new Ava({
            class: "ava",
  });
  
  render("#app", newAva);
