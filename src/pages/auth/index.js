import Button from "../../components/button/index";
import Title from "../../components/title/index";
import Link from "../../components/link/index";
import Input from "../../components/inputs/index";
import Error from "../../components/error";
import errorMsg from "../../data/errorMsg";
import validations from "../../helpers/validation";
import showError from "../../helpers/showError";

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    });
    return temp;
}

const form = document.createElement("form");
form.id = "authForm";
const links = document.createElement("div")
const templateForm = document.getElementById("app").appendChild(form);
const templateLinks = document.getElementById("app").appendChild(links)

const input = new Input({
    inputType: "text",
    inputName: "login",
    placeHolderText: "логин",
    inputId: "enterLogin",
});
const errorLogin = new Error({
    message: errorMsg.messages.login,
    errorId: "errorLogin",
});
const password = new Input({
    inputType: "password",
    inputName: "password",
    placeHolderText: "пароль",
    inputId: "enterPassword",
});
const errorPassword = new Error({
    message: errorMsg.messages.password,
    errorId: "errorPassword",
});
const link = new Link({
    url: "/registration",
    title: "Зарегистрироваться",
});
const title = new Title({
    text: "Вход",
});
const button = new Button({
    class: "btn",
    type: "button",
    url: '/chating',
    label: "Войти",
    id: "enterBtn",
});

const resultForm = [
    title,
    input,
    errorLogin,
    password,
    errorPassword,
];
const resultLinks = [button, link]
if (window.location.pathname === "/" || window.location.pathname === "/auth") {
    render(templateForm, resultForm);
    render(templateLinks, resultLinks)
}

function validator(field, value) {
    if (field === "login") {
        return !validations.validations.login(value);
    } else if (field === "password") {
        return !validations.validations.password(value);
    }
}

const currentFormAuth = {
    login: "",
    password: "",
};

templateForm.querySelectorAll("input").forEach((item) => {
    item.addEventListener("blur", (e) => {
        currentFormAuth.login = document.getElementById("enterLogin")?.value;
        currentFormAuth.password =
            document.getElementById("enterPassword")?.value;
        showError.showError("login", "errorLogin", e, validator);
        showError.showError("password", "errorPassword", e, validator);
        if (
            window.location.pathname === "/" ||
            window.location.pathname === "/auth"
        ) {
            console.log("Текущие значения в форме: ", currentFormAuth);
        }
    });
});
templateForm.querySelectorAll("input").forEach((item) => {
    item.removeEventListener("blur", () => { });
});

document.getElementById("authForm")?.addEventListener("click", (e) => {
    // по клику генерируется submit
    e.preventDefault();
    e.stopPropagation();
    templateForm.querySelectorAll("input").forEach((item) => {
        if (validator(item.name, item.value) && item.name === "password") {
            document.getElementById("errorPassword").style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === "login") {
            document.getElementById("errorLogin").style.opacity = 1;
        }
    });
});
