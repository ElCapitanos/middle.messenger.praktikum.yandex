import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Ava from '../../components/ava/index';
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

const formPsw = document.createElement('form');
formPsw.id = 'passwordForm';
const templatePasswordForm:HTMLElement | any = document.getElementById('app')?.appendChild(formPsw);

const ava = new Ava({
    class: 'ava'
});
const inputOldPsw = new Input({
    inputType: 'password',
    inputName: 'password',
    placeHolderText: 'старый\u00A0пароль',
    inputId: 'password',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
    }
});
const inputNewPsw = new Input({
    inputType: 'password',
    inputName: 'passwordCopy',
    placeHolderText: 'новый\u00A0пароль',
    inputId: 'passwordCopy',
    events: {
        blur: (e:any) => {
          e.preventDefault();
          onBlur(e);
        },
    }
});
const inputNewPswCopy = new Input({
    inputType: 'password',
    inputName: 'passwordNewCopy',
    placeHolderText: 'новый\u00A0пароль\u00A0(еще\u00A0раз)',
    inputId: 'passwordNewCopy',
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
const errorPasswordCopy = new Error({
    message: errorMsg.messages.passwordCopy,
    errorId: 'errorPasswordCopy'
});
const errorPasswordNewCopy = new Error({
    message: errorMsg.messages.passwordCopy,
    errorId: 'errorPasswordNewCopy'
});
const title = new Title({
    text: 'Смена пароля'
});
const buttonSave = new Button({
    class: 'btn',
    type: 'submit',
    label: 'Сохранить изменения',
    id: 'saveBtn',
    events: {
        click: (e:any) => {
          onSubmit(e);
        },
    }
});
const buttonCancel = new Button({
    class: 'btn',
    type: 'button',
    url: '/',
    label: 'Отмена',
    id: 'cancelBtn'
});
const link = new Link({
    url: '/',
    title: 'Удалить аккаунт'
});

const resultForm:Array<any> = [
    title,
    ava,
    inputOldPsw,
    errorPassword,
    inputNewPsw,
    errorPasswordCopy,
    inputNewPswCopy,
    errorPasswordNewCopy,
    buttonSave, 
    buttonCancel, 
    link
];

if (window.location.pathname === '/password-change') {
    render(templatePasswordForm, resultForm);
}

function validator(field, value) {
    if (field === 'password') {
        return !validations.validations.password(value);
    } if (field === 'passwordCopy') {
        return value !== document.getElementById('password').value;
    } if (field === 'passwordNewCopy') {
        return value !== document.getElementById('passwordCopy').value;
    }
    return null; // для EsLint )
}

const currentFormPasswordChange = {
    password: '',
    passwordCopy: '',
    passwordNewCopy: ''
};

    function onBlur(e:any) {
        currentFormPasswordChange.password = document.getElementById('password')?.value;
        currentFormPasswordChange.passwordCopy = document.getElementById('passwordCopy')?.value;
        currentFormPasswordChange.passwordNewCopy = document.getElementById('passwordNewCopy')?.value;
        showError('password', 'errorPassword', e, validator);
        showError('passwordCopy', 'errorPasswordCopy', e, validator);
        showError(
            'passwordNewCopy',
            'errorPasswordNewCopy',
            e,
            validator
        );
        if (window.location.pathname === '/password-change') {
            console.log(
                'Текущие значения в форме: ',
                currentFormPasswordChange
            );
        }
    }

templatePasswordForm.querySelectorAll('input').forEach((item) => {
    item.removeEventListener('blur', () => { });
});


function onSubmit(e:any) { // по клику генерируется submit
    e.preventDefault();
    e.stopPropagation();
    templatePasswordForm.querySelectorAll('input').forEach((item) => {
        if (validator(item.name, item.value) && item.name === 'password') {
            document.getElementById('errorPassword').style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === 'passwordCopy') {
            document.getElementById('errorPasswordCopy').style.opacity = 1;
        }
        if (
            validator(item.name, item.value)
            && item.name === 'passwordNewCopy'
        ) {
            document.getElementById('errorPasswordNewCopy').style.opacity = 1;
        }
    });
}
