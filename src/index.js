import btn from './components/button/button.hbs'
class Button extends Block {
    constructor(props) {
      super("div", props);
    }
    newBtn = btn({ label: 'Войти', url: '/', btnType: 'submit' })
    render() {
      return `<button class=${this.props.class} type=${this.props.type}><a href=${this.props.url}>${this.props.label}</a></button>`;
    }
  }
  
  function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }
  
  const button = new Button({
            class: "btn",
            text: 'Click me',
            type: 'submit',
            url: '/registration',
            label: 'Нажать!'
  });
  
  render("#app", button);

  setTimeout(() => {
    button.setProps({
      label: 'Не нажимать!',
    });
  }, 3000);