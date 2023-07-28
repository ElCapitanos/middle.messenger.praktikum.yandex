import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import validations from '../../helpers/validation';
import showError from '../../helpers/showError';
import { StringObject } from '../../helpers/constTypes'

function render(temp:HTMLElement, arrBlock:any) {
    arrBlock.forEach((item:any) => {
        temp.appendChild(item.getContent());
    });
    return temp;
}

const formReg:HTMLElement | any = document.createElement('form');
formReg.id = 'formReg';

const templateRegForm:HTMLElement | any = document.getElementById('app')?.appendChild(formReg);

const inputName = new Input({
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
const inputSecondName = new Input({
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
const inputLogin = new Input({
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
const inputPhone = new Input({
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
const inputMail = new Input({
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
const password = new Input({
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
const passwordCopy = new Input({
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
const errorName = new Error({
    message: errorMsg.messages.name,
    errorId: 'errorName'
});
const errorSecondName = new Error({
    message: errorMsg.messages.name,
    errorId: 'errorSecondName'
});
const errorLogin = new Error({
    message: errorMsg.messages.login,
    errorId: 'errorLogin'
});
const errorPhone = new Error({
    message: errorMsg.messages.phone,
    errorId: 'errorPhone'
});
const errorMail = new Error({
    message: errorMsg.messages.mail,
    errorId: 'errorMail'
});
const errorPassword = new Error({
    message: errorMsg.messages.password,
    errorId: 'errorPassword'
});
const errorPasswordCopy = new Error({
    message: errorMsg.messages.passwordCopy,
    errorId: 'errorPasswordCopy'
});
const title = new Title({
    text: 'Регистрация'
});
const button = new Button({
    class: 'btn',
    type: 'submit',
    label: 'Зарегистрироваться',
    id: 'regBtn',
    events: {
      click: (e:any) => {
        onSubmit(e);
      },
    }
});
const link = new Link({
    url: '/chating',
    title: 'Войти'
});

const resultFormReg:Array<any> = [title, inputName, errorName, inputSecondName, errorSecondName, inputLogin, errorLogin, inputPhone, errorPhone, inputMail, errorMail, password, errorPassword, passwordCopy, errorPasswordCopy, button, link];

if (window.location.pathname === '/registration') {
    render(templateRegForm, resultFormReg);
}

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

// templateRegForm.querySelectorAll('input').forEach((item:any) => {
//     item.addEventListener('blur', (e:any) => {//@ts-ignore
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
//     });
// });
templateRegForm.querySelectorAll('input').forEach((item:any) => {
    item.removeEventListener('blur', () => { });
});

function onSubmit(e:any) {// по клику генерируется submit
    e.preventDefault();
    e.stopPropagation();
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
