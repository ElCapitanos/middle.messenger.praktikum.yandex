import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import validations from '../../helpers/validation';
import showError from '../../helpers/showError';
import { StringObject } from '../../helpers/constTypes';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import temp from './registration.hbs';

const router = new Router;

const InputNameReg = new Input({
    inputType: 'text',
    inputName: 'first_name',
    placeHolderText: 'имя',
    inputId: 'regName',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
      }
});
const InputSecondNameReg = new Input({
    inputType: 'text',
    inputName: 'second_name',
    placeHolderText: 'фамилия',
    inputId: 'regSecondName',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
      }
});
const InputLoginReg = new Input({
    inputType: 'text',
    inputName: 'login',
    placeHolderText: 'логин',
    inputId: 'regLogin',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
      }
});
const InputPhoneReg = new Input({
    inputType: 'tel',
    inputName: 'phone',
    placeHolderText: 'телефон',
    inputId: 'regPhone',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
      }
});
const InputMailReg = new Input({
    inputType: 'email',
    inputName: 'email',
    placeHolderText: 'e-mail',
    inputId: 'regMail',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
      }
});
const PasswordReg = new Input({
    inputType: 'password',
    inputName: 'password',
    placeHolderText: 'пароль',
    inputId: 'password',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
      }
});
const PasswordCopyReg = new Input({
    inputType: 'password',
    inputName: 'passwordCopy',
    placeHolderText: 'пароль\u00A0(еще\u00A0раз)',
    inputId: 'passwordCopy',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
      }
});
const ErrorNameReg = new Error({
    message: errorMsg.messages.name,
    errorId: 'errorName'
});
const ErrorSecondNameReg = new Error({
    message: errorMsg.messages.name,
    errorId: 'errorSecondName'
});
const ErrorLoginReg = new Error({
    message: errorMsg.messages.login,
    errorId: 'errorLogin'
});
const ErrorPhoneReg = new Error({
    message: errorMsg.messages.phone,
    errorId: 'errorPhone'
});
const ErrorMailReg = new Error({
    message: errorMsg.messages.mail,
    errorId: 'errorMail'
});
const ErrorPasswordReg = new Error({
    message: errorMsg.messages.password,
    errorId: 'errorPassword'
});
const ErrorPasswordCopyReg = new Error({
    message: errorMsg.messages.passwordCopy,
    errorId: 'errorPasswordCopy'
});
const TitleReg = new Title({
    text: 'Регистрация'
});
const ButtonReg = new Button({
    class: 'btn',
    type: 'submit',
    label: 'Зарегистрироваться',
    id: 'regBtn',
    events: {
      click: (e:any) => {
        onSubmit(e);
        router.go('/messenger');
      },
    }
});
const LinkReg = new Link({
    events: {
        click: () => {
          router.go('/messenger');
        },
      },
    title: 'Войти'
});

function validator(field:string, value:string) {
    if (
        field === 'first_name'
        || field === 'second_name'
        || field === 'display_name'
    ) {
        return !validations.validations.name(value);
    } if (field === 'login') {
        return !validations.validations.login(value);
    } if (field === 'email') {
        return !validations.validations.mail(value);
    } if (field === 'phone') {
        return !validations.validations.phone(value);
    } if (field === 'password') {
        return !validations.validations.password(value);
    } if (field === 'passwordCopy') {//@ts-ignore
        return value !== document.getElementById('password')?.value;
    }
    return null; // для EsLint
}

const currentFormReg:StringObject = {
    first_name: '',
    second_name: '',
    login: '',
    phone: '',
    email: '',
    password: '',
    passwordCopy: ''
};

function onBlur(e:any) {
        currentFormReg.first_name = document.getElementById('regName')?.value;//@ts-ignore
        currentFormReg.second_name = document.getElementById('regSecondName')?.value;//@ts-ignore
        currentFormReg.login = document.getElementById('regLogin')?.value;//@ts-ignore
        currentFormReg.phone = document.getElementById('regPhone')?.value;//@ts-ignore
        currentFormReg.email = document.getElementById('regMail')?.value;//@ts-ignore
        currentFormReg.password = document.getElementById('password')?.value;//@ts-ignore
        currentFormReg.passwordCopy = document.getElementById('passwordCopy')?.value;
        showError('first_name', 'errorName', e, validator);
        showError('second_name', 'errorSecondName', e, validator);
        showError('login', 'errorLogin', e, validator);
        showError('phone', 'errorPhone', e, validator);
        showError('email', 'errorMail', e, validator);
        showError('password', 'errorPassword', e, validator);
        showError('passwordCopy', 'errorPasswordCopy', e, validator);
        if (window.location.pathname === '/registration') {
            console.log('Текущие значения в форме: ', currentFormReg);
        }
    }

    document.querySelectorAll('input').forEach((item:any) => {
        item.removeEventListener('blur', () => { });
    });
    
    function onSubmit(e:any) {// по клику генерируется submit
        e.preventDefault();
        e.stopPropagation();
    const templateRegForm:HTMLElement | any = document.getElementById('formReg');
    templateRegForm.querySelectorAll('input').forEach((item:any) => {
        if ((validator(item.name, item.value) && item.name === 'first_name')) {//@ts-ignore
            document.getElementById('errorName').style.opacity = 1;
        }
        if ((validator(item.name, item.value) && item.name === 'second_name')) {//@ts-ignore
            document.getElementById('errorSecondName').style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === 'login') {//@ts-ignore
            document.getElementById('errorLogin').style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === 'phone') {//@ts-ignore
            document.getElementById('errorPhone').style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === 'email') {//@ts-ignore
            document.getElementById('errorMail').style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === 'password') {//@ts-ignore
            document.getElementById('errorPassword').style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === 'passwordCopy') {//@ts-ignore
            document.getElementById('errorPasswordCopy').style.opacity = 1;
        }
})
}

class Registration extends Block {
    constructor() {
        super('div', {//@ts-ignore
            attr: {
                classes: [],
            },
            TitleReg,
            InputNameReg,
            ErrorNameReg,
            InputSecondNameReg,
            ErrorSecondNameReg,
            InputLoginReg,
            ErrorLoginReg,
            InputPhoneReg,
            ErrorPhoneReg,
            InputMailReg,
            ErrorMailReg,
            PasswordReg,
            ErrorPasswordReg,
            PasswordCopyReg,
            ErrorPasswordCopyReg,
            ButtonReg,
            LinkReg
        })
    }
  
    render() {
        return this.compile(temp, {
          TitleReg: this.children.TitleReg,
          InputNameReg: this.children.InputNameReg,
          ErrorNameReg: this.children.ErrorNameReg,
          InputSecondNameReg: this.children.InputSecondNameReg,
          ErrorSecondNameReg: this.children.ErrorSecondNameReg,
          InputLoginReg: this.children.InputLoginReg,
          ErrorLoginReg: this.children.ErrorLoginReg,
          InputPhoneReg: this.children.InputPhoneReg,
          ErrorPhoneReg: this.children.ErrorPhoneReg,
          InputMailReg: this.children.InputMailReg,
          ErrorMailReg: this.children.ErrorMailReg,
          PasswordReg: this.children.PasswordReg,
          ErrorPasswordReg: this.children.ErrorPasswordReg,
          PasswordCopyReg: this.children.PasswordCopyReg,
          ErrorPasswordCopyReg: this.children.ErrorPasswordCopyReg,
          ButtonReg: this.children.ButtonReg,
          LinkReg: this.children.LinkReg
        })
    }
  }
  
  export default Registration;
  