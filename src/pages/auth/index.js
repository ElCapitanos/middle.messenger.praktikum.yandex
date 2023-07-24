import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Input from '../../components/inputs/index';

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    })
    return temp;
};

const template = document.getElementById('app');

const input = new Input({
    inputType: 'text', 
    inputName: 'login', 
    placeHolderText: 'логин',
    inputId: 'enterLogin'
});
const password = new Input({
    inputType: 'password', 
    inputName: 'password', 
    placeHolderText: 'пароль',
    inputId: 'enterPassword'
});
const link = new Link({
    url: '/registration',
    title: 'Зарегистрироваться'
});
const title = new Title({
    text: 'Вход'
});
const button = new Button({
    class: "btn",
    type: 'submit',
    url: '/chating',
    label: 'Войти',
    id: 'enterBtn'
  });

  const result = [title, input, password, button, link]

if (window.location.pathname === '/' || window.location.pathname === '/auth') { 
    render(template, result)
}
