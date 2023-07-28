import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Input from '../../components/inputs/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import validations from '../../helpers/validation';
import showError from '../../helpers/showError';

function render(temp:HTMLElement, arrBlock:any) {
  arrBlock.forEach((item:any) => {
    temp.appendChild(item.getContent());
  });
  return temp;
}

const form:HTMLElement = document.createElement('form');
form.id = 'authForm';
const links:HTMLElement = document.createElement('div');
const templateForm:HTMLElement | any = document.getElementById('app')?.appendChild(form);
const templateLinks:HTMLElement | any = document.getElementById('app')?.appendChild(links);

const input = new Input({
  inputType: 'text',
  inputName: 'login',
  placeHolderText: 'логин',
  inputId: 'enterLogin',
  events: {
    focus: (event:any) => {
      console.log('!!!!', event);
    }
  }
});
const errorLogin = new Error({
  message: errorMsg.messages.login,
  errorId: 'errorLogin'
});
const password = new Input({
  inputType: 'password',
  inputName: 'password',
  placeHolderText: 'пароль',
  inputId: 'enterPassword'
});
const errorPassword = new Error({
  message: errorMsg.messages.password,
  errorId: 'errorPassword'
});
const link = new Link({
  url: '/registration',
  title: 'Зарегистрироваться'
});
const title = new Title({
  text: 'Вход'
});
const button = new Button({
  class: 'btn',
  type: 'button',
  url: '/chating',
  label: 'Войти',
  id: 'enterBtn'
});

const resultForm = [
  title,
  input,
  errorLogin,
  password,
  errorPassword
];
const resultLinks = [button, link];
if (window.location.pathname === '/' || window.location.pathname === '/auth') {
  render(templateForm, resultForm);
  render(templateLinks, resultLinks);
}

function validator(field:string, value:string) {
  return field === 'login' ? !validations.validations.login(value) : !validations.validations.password(value);
}

const currentFormAuth = {
  login: '',
  password: ''
};

templateForm.querySelectorAll('input').forEach((item:any) => {
  item.addEventListener('blur', (e:any) => {//@ts-ignore
    currentFormAuth.login = document.getElementById('enterLogin')?.value;//@ts-ignore
    currentFormAuth.password = document.getElementById('enterPassword')?.value;
    showError('login', 'errorLogin', e, validator);
    showError('password', 'errorPassword', e, validator);
    if (
      window.location.pathname === '/'
      || window.location.pathname === '/auth'
    ) {
      console.log('Текущие значения в форме: ', currentFormAuth);
    }
  });
});
templateForm.querySelectorAll('input').forEach((item:any) => {
  item.removeEventListener('blur', () => { });
});

document.getElementById('authForm')?.addEventListener('click', (e) => {
  // по клику генерируется submit
  e.preventDefault();
  e.stopPropagation();
  templateForm.querySelectorAll('input').forEach((item:any) => {
    if (validator(item.name, item.value) && item.name === 'password') {//@ts-ignore
      document.getElementById('errorPassword').style.opacity = 1;
    }
    if (validator(item.name, item.value) && item.name === 'login') {//@ts-ignore
      document.getElementById('errorLogin').style.opacity = 1;
    }
  });
});
