import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    })
    return temp;
};

const template = document.getElementById("app");

const inputName = new Input({
    inputType: "text",
    inputName: "first_name",
    placeHolderText: "имя",
    inputId: "regName"
});
const inputSecondName = new Input({
    inputType: "text",
    inputName: "second_name",
    placeHolderText: "фамилия",
    inputId: "regSecondName"
});
const inputLogin = new Input({
    inputType: "text",
    inputName: "login",
    placeHolderText: "логин",
    inputId: "regLogin"
});
const inputPhone = new Input({
    inputType: "tel",
    inputName: "phone",
    placeHolderText: "телефон",
    inputId: "regPhone"
});
const inputMail = new Input({
    inputType: "email",
    inputName: "email",
    placeHolderText: "e-mail",
    inputId: "regMail"
});
const password = new Input({
    inputType: "password",
    inputName: "password",
    placeHolderText: "пароль",
    inputId: "regPassword"
});
const passwordCopy = new Input({
    inputType: "password",
    inputName: "passwordCopy",
    placeHolderText: "пароль\u00A0(еще\u00A0раз)",
    inputId: "regPasswordCopy"
});
const title = new Title({
    text: "Регистрация"
});
const button = new Button({
    class: "btn",
    type: "submit",
    url: "/chating",
    label: "Зарегистрироваться",
    id: "regBtn",
    // events: {
    //     click: event => {
    //         console.log(event.target);
    //     },
    // },
});
const link = new Link({
    url: '/chating',
    title: 'Войти'
});

const result = [title, inputName, inputSecondName, inputLogin, inputPhone, inputMail, password, passwordCopy, button, link];

if (window.location.pathname === "/registration") {
    render(template, result)
}
