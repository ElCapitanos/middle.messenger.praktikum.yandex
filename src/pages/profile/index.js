import Button from "../../components/button/index";
import Title from "../../components/title/index";
import Input from "../../components/inputs/index";
import Link from "../../components/link/index";
import Ava from "../../components/ava/index";
import Error from "../../components/error/index";
import errorMsg from "../../data/errorMsg";
import validations from "../../helpers/validation";

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    });
    return temp;
}

const template = document.getElementById("app");
const ava = new Ava({
    class: "ava",
});
const errorName = new Error({
    message: errorMsg.messages.name,
    errorId: "errorName",
});
const errorSecondName = new Error({
    message: errorMsg.messages.name,
    errorId: "errorSecondName",
});
const errorLogin = new Error({
    message: errorMsg.messages.login,
    errorId: "errorLogin",
});
const errorPhone = new Error({
    message: errorMsg.messages.phone,
    errorId: "errorPhone",
});
const errorMail = new Error({
    message: errorMsg.messages.mail,
    errorId: "errorMail",
});
const errorUser = new Error({
    message: errorMsg.messages.name,
    errorId: "errorUser",
});
const inputName = new Input({
    inputType: "text",
    inputName: "first_name",
    placeHolderText: "сменить\u00A0имя",
    inputId: "profileName",
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
    inputId: "profileLogin",
});
const inputPhone = new Input({
    inputType: "tel",
    inputName: "phone",
    placeHolderText: "сменить\u00A0телефон",
    inputId: "rprofilePhone",
});
const inputMail = new Input({
    inputType: "email",
    inputName: "email",
    placeHolderText: "сменить\u00A0e-mail",
    inputId: "profileMail",
});
const inputUser = new Input({
    inputType: "text",
    inputName: "display_name",
    placeHolderText: "сменить\u00A0имя\u00A0в\u00A0чате",
    inputId: "profileUser",
});
const title = new Title({
    text: "Профиль",
});
const button = new Button({
    class: "btn",
    type: "submit",
    url: "/chating",
    label: "Сохранить изменения",
    id: "profileBtn",
});
const link = new Link({
    url: "/",
    title: "Удалить аккаунт",
});

const result = [
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
    link,
];

if (window.location.pathname === "/profile") {
    render(template, result);
}
function validator(field, value) {
    if (
        field === "first_name" ||
        field === "second_name" ||
        field === "display_name"
    ) {
        return !validations.validations.name(value);
    } else if (field === "login") {
        return !validations.validations.login(value);
    } else if (field === "email") {
        return !validations.validations.mail(value);
    } else if (field === "phone") {
        return !validations.validations.phone(value);
    } else if (field === "message") {
        return !validations.validations.message(value);
    } else if (field === "password") {
        return !validations.validations.password(value);
    }
}
function showError(field, errorElement, e) {
    e.target.name === field && validator(field, e.target.value)
        ? (document.getElementById(errorElement).style.opacity = 1)
        : (document.getElementById(errorElement).style.opacity = 0);
}
template.querySelectorAll("input").forEach((item) => {
    item.addEventListener("blur", (e) => {
        showError("first_name", "errorName", e);
        showError("second_name", "errorSecondName", e);
        showError("login", "errorLogin", e);
        showError("phone", "errorPhone", e);
        showError("email", "errorMail", e);
        showError("display_name", "errorUser", e);
    });
});
template.querySelectorAll("input").forEach((item) => {
    item.removeEventListener("blur", null);
});
