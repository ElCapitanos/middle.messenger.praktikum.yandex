import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Ava from '../../components/ava/index';
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
const formProfile:HTMLElement | any = document.createElement('form');
formProfile.id = 'formProfile';
const templateFormProfile:HTMLElement | any = document.getElementById('app')?.appendChild(formProfile);

const ava = new Ava({
    class: 'ava'
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
const errorUser = new Error({
    message: errorMsg.messages.name,
    errorId: 'errorUser'
});
const inputName = new Input({
    inputType: 'text',
    inputName: 'first_name',
    placeHolderText: 'сменить\u00A0имя',
    inputId: 'profileName',
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
    placeHolderText: 'сменить\u00A0фамилию',
    inputId: 'profileSecondName',
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
    placeHolderText: 'сменить\u00A0логин',
    inputId: 'profileLogin',
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
    placeHolderText: 'сменить\u00A0телефон',
    inputId: 'rprofilePhone',
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
    placeHolderText: 'сменить\u00A0e-mail',
    inputId: 'profileMail',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
    }
});
const inputUser = new Input({
    inputType: 'text',
    inputName: 'display_name',
    placeHolderText: 'сменить\u00A0имя\u00A0в\u00A0чате',
    inputId: 'profileUser',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
    }
});
const title = new Title({
    text: 'Профиль'
});
const button = new Button({
    class: 'btn',
    type: 'submit',
    label: 'Сохранить изменения',
    id: 'profileBtn',
    events: {
        click: (e:any) => {
          onSubmit(e);
        },
    }
});
const link = new Link({
    url: '/',
    title: 'Удалить аккаунт'
});

const resultFormProfile:Array<any> = [
    title,
    ava,
    inputName,
    errorName,
    inputSecondName,
    errorSecondName,
    inputLogin,
    errorLogin,
    inputPhone,
    errorPhone,
    inputMail,
    errorMail,
    inputUser,
    errorUser,
    button, 
    link
];

if (window.location.pathname === '/profile') {
    render(templateFormProfile, resultFormProfile);
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
    }
    return null; // для EsLint
}

const currentFormProfile:StringObject = {
    first_name: '',
    second_name: '',
    login: '',
    phone: '',
    email: '',
    display_name: ''
};

        //@ts-ignore
        function onBlur(e:any) {
        currentFormProfile.first_name = document.getElementById('profileName')?.value;//@ts-ignore
        currentFormProfile.second_name = document.getElementById('profileSecondName')?.value;//@ts-ignore
        currentFormProfile.login = document.getElementById('profileLogin')?.value;//@ts-ignore
        currentFormProfile.phone = document.getElementById('rprofilePhone')?.value;//@ts-ignore
        currentFormProfile.email = document.getElementById('profileMail')?.value;//@ts-ignore
        currentFormProfile.display_name = document.getElementById('profileUser')?.value;
        showError('first_name', 'errorName', e, validator);
        showError('second_name', 'errorSecondName', e, validator);
        showError('login', 'errorLogin', e, validator);
        showError('phone', 'errorPhone', e, validator);
        showError('email', 'errorMail', e, validator);
        showError('display_name', 'errorUser', e, validator);
        if (window.location.pathname === '/profile') { console.log('Текущие значения в форме: ', currentFormProfile); }
        }

templateFormProfile.querySelectorAll('input').forEach((item:any) => {
    item.removeEventListener('blur', () => { });
});

function onSubmit(e:any) { // по клику генерируется submit
    e.preventDefault();
    e.stopPropagation();
    templateFormProfile.querySelectorAll('input').forEach((item:any) => {
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
        if (validator(item.name, item.value) && item.name === 'display_name') {//@ts-ignore
            document.getElementById('errorUser').style.opacity = 1;
        }
    });
}
