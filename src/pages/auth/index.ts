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
const templateForm:HTMLElement | any = document.getElementById('app')?.appendChild(form);

const input = new Input({
  inputType: 'text',
  inputName: 'login',
  placeHolderText: 'логин',
  inputId: 'enterLogin',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
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
  inputId: 'enterPassword',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    },
  }
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
  type: 'submit',
  label: 'Войти',
  id: 'enterBtn',
  events: {
    click: (e:any) => {
      onSubmit(e);
    },
  }
});

const resultForm = [
  title,
  input,
  errorLogin,
  password,
  errorPassword,
  button,
  link
];

if (window.location.pathname === '/' || window.location.pathname === '/auth') {
  render(templateForm, resultForm);
}

function validator(field:string, value:string) {
  return field === 'login' ? !validations.validations.login(value) : !validations.validations.password(value);
}

const currentFormAuth = {
  login: '',
  password: ''
};

function onBlur(e:any) {//@ts-ignore
  currentFormAuth.login = document.getElementById('enterLogin')?.value;//@ts-ignore
  currentFormAuth.password = document.getElementById('enterPassword')?.value;
  showError('login', 'errorLogin', e, validator);
  showError('password', 'errorPassword', e, validator);
  if (
    window.location.pathname === '/' || window.location.pathname === '/auth') {
    console.log('Текущие значения в форме: ', currentFormAuth);
  }
}

function onSubmit(e:any) { // по клику генерируется submit
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
}
