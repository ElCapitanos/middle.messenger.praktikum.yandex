import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Input from '../../components/inputs/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import validations from '../../helpers/validation';
import showError from '../../helpers/showError';
import Router from '../../utils/Router';
import Block from '../../utils/Block';
import temp from './auth.hbs';
import AuthController from '../../controllers/authController';
import withUser from '../../utils/useStore';
import toAuth from '../../helpers/toAuth';

toAuth();

const router = new Router();


const InputAuth = new Input({
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
const ErrorLoginAuth = new Error({
  message: errorMsg.messages.login,
  errorId: 'errorLogin'
});
const PasswordAuth = new Input({
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
const ErrorPasswordAuth = new Error({
  message: errorMsg.messages.password,
  errorId: 'errorPassword'
});
const LinkAuth = new Link({
  title: 'Зарегистрироваться',
  events: {
    click: () => {
      router.go('/sign-up');
    },
  }
});
const TitleAuth = new Title({
  text: 'Вход'
});
const ButtonAuth = new Button({
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
  const templateForm:HTMLElement | any = document?.getElementById('authForm');
  let validErrorCounter:number = 0;
  templateForm.querySelectorAll('input').forEach((item:any) => {
    if (validator(item.name, item.value) && item.name === 'password') {//@ts-ignore
      document.getElementById('errorPassword').style.opacity = 1;
      validErrorCounter++;
    }
    if (validator(item.name, item.value) && item.name === 'login') {//@ts-ignore
      document.getElementById('errorLogin').style.opacity = 1;
      validErrorCounter++;
    }
  });
  if (validErrorCounter === 0) {
    AuthController.signIn(JSON.stringify(currentFormAuth));
  }
}

class Auth extends Block {
  constructor() {
   super('div', {//@ts-ignore
    attr: {
    classes: []
    },
    TitleAuth,
    InputAuth,
    ErrorLoginAuth,
    PasswordAuth,
    ErrorPasswordAuth,
    ButtonAuth, 
    LinkAuth
   })
  }

  render() {
    return this.compile(temp, {
      TitleAuth: this.children.TitleAuth,
      InputAuth: this.children.InputAuth,
      ErrorLoginAuth: this.children.ErrorLoginAuth,
      PasswordAuth: this.children.PasswordAuth,
      ErrorPasswordAuth: this.children.ErrorPasswordAuth,
      ButtonAuth: this.children.ButtonAuth,
      LinkAuth: this.children.LinkAuth
    })
  }
}

export default withUser(Auth);
