import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Ava from '../../components/ava/index';
import Error from '../../components/error/index';

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    })
    return temp;
};

const template = document.getElementById("app");
const ava = new Ava({
    class: "ava"
});
const errorName = new Error ({
    message: 'Первая буква имени должна быть заглавной, цифры, пробелы и спецсимволы (кроме дефиса) недопустимы',
    errorId: 'errorName'
});
const errorSecondName = new Error ({
    message: 'Первая буква фамилии должна быть заглавной, цифры, пробелы и спецсимволы (кроме дефиса) недопустимы',
    errorId: 'errorSecondName'
});
const errorLogin = new Error ({
    message: 'Логин должен содержать от 3 до 20 символов без пробелов и спецсимволов (допустимы дефис и нижнее подчёркивание)',
    errorId: 'errorLogin'
});
const errorPhone = new Error ({
    message: 'Номер должен содержать от 10 до 15 символов, состоять из цифр, может начинается с плюса',
    errorId: 'errorPhone'
});
const errorMail = new Error ({
    message: 'Адрес почты должен быть на латинице, может включать цифры и некоторые спецсимволы, плюс «собака» (@) и буквы с точкой после',
    errorId: 'errorMail'
});
const errorUser = new Error ({
    message: 'Первая буква ника должна быть заглавной, цифры, пробелы и спецсимволы (кроме дефиса) недопустимы',
    errorId: 'errorUser'
});
const inputName = new Input({
    inputType: "text",
    inputName: "first_name",
    placeHolderText: "сменить\u00A0имя",
    inputId: "profileName",
    // events: {
    //     focus: (e) => {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         console.log('!!!!!!!!!!!', e.target);
    //     },
    // },
});
const inputSecondName = new Input({
    inputType: "text",
    inputName: "second_name",
    placeHolderText: "сменить\u00A0фамилию",
    inputId: "profileSecondName",
});
const inputLogin = new Input({
    inputType: "text",
    inputName: "login",
    placeHolderText: "сменить\u00A0логин",
    inputId: "profileLogin"
});
const inputPhone = new Input({
    inputType: "tel",
    inputName: "phone",
    placeHolderText: "сменить\u00A0телефон",
    inputId: "rprofilePhone"
});
const inputMail = new Input({
    inputType: "email",
    inputName: "email",
    placeHolderText: "сменить\u00A0e-mail",
    inputId: "profileMail"
});
const inputUser = new Input({
    inputType: "text",
    inputName: "display_name",
    placeHolderText: "сменить\u00A0имя\u00A0в\u00A0чате",
    inputId: "profileUser",

});
const title = new Title({
    text: "Профиль"
});
const button = new Button({
    class: "btn",
    type: "submit",
    url: "/chating",
    label: "Сохранить изменения",
    id: "profileBtn",
});
const link = new Link({
    url: '/',
    title: 'Удалить аккаунт'
});

const result = [title, ava, inputName, errorName, inputSecondName, errorSecondName, inputLogin, errorLogin, inputPhone, errorPhone, inputMail, errorMail, inputUser, errorUser, button, link];

if (window.location.pathname === "/profile") {
    render(template, result)
}
function showError(field, errorElement, e) {
    e.target.name === field && e.target.value.length < 4 ? document.getElementById(errorElement).style.opacity = 1 : document.getElementById(errorElement).style.opacity = 0
};
template.querySelectorAll("input").forEach((item) => {
    item.addEventListener("blur", (e) => {
        showError('first_name', 'errorName', e)
        showError('second_name', 'errorSecondName', e)
        showError('login', 'errorLogin', e)
        showError('phone', 'errorPhone', e)
        showError('email', 'errorMail', e)
        showError('display_name', 'errorUser', e)
    });
});
