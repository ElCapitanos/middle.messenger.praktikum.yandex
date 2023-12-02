import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import validations from '../../helpers/validation';
import showError from '../../helpers/showError';
import Router from '../../utils/Router';
import Block from '../../utils/Block';
import temp from './passwordChange.hbs';
import AuthController from '../../controllers/authController';
import UserController from '../../controllers/userController';
import { StringObject } from '../../helpers/constTypes';
import toAuth from '../../helpers/toAuth';

toAuth();

const router = new Router();

const InputOldPsw = new Input({
  inputType: 'password',
  inputName: 'password',
  placeHolderText: 'старый\u00A0пароль',
  inputId: 'password',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    }
  }
});
const InputNewPsw = new Input({
  inputType: 'password',
  inputName: 'newPassword',
  placeHolderText: 'новый\u00A0пароль',
  inputId: 'newPassword',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    }
  }
});
const InputNewPswCopy = new Input({
  inputType: 'password',
  inputName: 'passwordNewCopy',
  placeHolderText: 'новый\u00A0пароль\u00A0(еще\u00A0раз)',
  inputId: 'passwordNewCopy',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    }
  }
});
const ErrorPassword = new Error({
  message: errorMsg.messages.password,
  errorId: 'errorPassword'
});
const ErrorNewPassword = new Error({
  message: errorMsg.messages.newPassword,
  errorId: 'errorNewPassword'
});
const ErrorPasswordNewCopy = new Error({
  message: errorMsg.messages.passwordCopy,
  errorId: 'errorPasswordNewCopy'
});
const TitlePsw = new Title({
  text: 'Смена пароля'
});
const ButtonSave = new Button({
  class: 'btn',
  type: 'submit',
  label: 'Сохранить изменения',
  id: 'saveBtn',
  events: {
    click: (e:any) => {
      onSubmit(e);
    }
  }
});
const ButtonCancel = new Button({
  class: 'btn',
  type: 'button',
  label: 'Отмена',
  id: 'cancelBtn',
  events: {
    click: () => {
      router.back();
    }
  }
});
const LinkPsw = new Link({
  events: {
    click: () => {
      logout();
    }
  },
  title: 'Выйти из системы'
});

//@ts-ignore
function validator(field, value) {
  if (field === 'password') {
    return !validations.validations.password(value);
  } if (field === 'newPassword') {//@ts-ignore
    return value !== document.getElementById('passwordNewCopy').value;
  } if (field === 'passwordNewCopy') {//@ts-ignore
    return value !== document.getElementById('newPassword').value;
  }
  return null; // для EsLint )
}

function logout() {
  AuthController.logOut();
}

const currentFormPasswordChange:StringObject = {
  oldPassword: '',
  newPassword: '',
  newPasswordCopy: ''
};

function onBlur(e:any) {//@ts-ignore
  currentFormPasswordChange.oldPassword = document.getElementById('password')?.value;//@ts-ignore
  currentFormPasswordChange.newPassword = document.getElementById('newPassword')?.value;//@ts-ignore
  currentFormPasswordChange.newPasswordCopy = document.getElementById('passwordNewCopy')?.value;
  showError('password', 'errorPassword', e, validator);
  showError('newPassword', 'ErrorNewPassword', e, validator);
  showError('passwordNewCopy', 'errorPasswordNewCopy', e, validator);
  if (window.location.pathname === '/password-change') {
    console.log('Текущие значения в форме: ', currentFormPasswordChange);
  }
}

document.querySelectorAll('input').forEach((item:any) => {
  item.removeEventListener('blur', () => { });
});

function onSubmit(e:any) { // по клику генерируется submit
  e.preventDefault();
  e.stopPropagation();
  const templatePasswordForm:HTMLElement | any = document?.getElementById('passwordForm');
  let validErrorCounter:number = 0;
  templatePasswordForm.querySelectorAll('input').forEach((item:any) => {
    if (validator(item.name, item.value) && item.name === 'password') {//@ts-ignore
      document.getElementById('errorPassword').style.opacity = 1;
      validErrorCounter++;
    }
    if (validator(item.name, item.value) && item.name === 'newPassword') {//@ts-ignore
      document.getElementById('errorNewPassword').style.opacity = 1;
      validErrorCounter++;
    }
    if (
      validator(item.name, item.value) && item.name === 'passwordNewCopy') {//@ts-ignore
      document.getElementById('errorPasswordNewCopy').style.opacity = 1;
      validErrorCounter++;
    }
  });
  if (validErrorCounter === 0) {
    delete currentFormPasswordChange.newPasswordCopy;
    UserController.updatePassword(JSON.stringify(currentFormPasswordChange));
  }
}

class PasswordChange extends Block {
  constructor() {
    super('div', {//@ts-ignore
      attr: {
        classes: []
      },
      TitlePsw,
      InputOldPsw,
      ErrorPassword,
      InputNewPsw,
      ErrorNewPassword,
      InputNewPswCopy,
      ErrorPasswordNewCopy,
      ButtonSave,
      ButtonCancel,
      LinkPsw
    })
  }

  render() {
    return this.compile(temp, {
      TitlePsw: this.children.TitlePsw,
      InputOldPsw: this.children.InputOldPsw,
      ErrorPassword: this.children.ErrorPassword,
      InputNewPsw: this.children.InputNewPsw,
      ButtonAuth: this.children.ButtonAuth,
      ErrorPasswordCopy: this.children.ErrorPasswordCopy,
      InputNewPswCopy: this.children.InputNewPswCopy,
      ErrorPasswordNewCopy: this.children.ErrorPasswordNewCopy,
      ButtonSave: this.children.ButtonSave,
      ButtonCancel: this.children.ButtonCancel,
      LinkPsw: this.children.LinkPsw,
    })
  }
}

export default PasswordChange;
