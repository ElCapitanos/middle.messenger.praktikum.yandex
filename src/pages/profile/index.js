import Button from "../../components/button/index";
import Title from "../../components/title/index";
import Input from "../../components/inputs/index";
import Link from "../../components/link/index";
import Ava from "../../components/ava/index";
import Error from "../../components/error/index";
import errorMsg from "../../data/errorMsg";
import validations from "../../helpers/validation";
import showError from "../../helpers/showError";

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    });
    return temp;
}

const formProfile = document.createElement("form");
formProfile.id = 'formProfile';
const linksProfile = document.createElement("div");
const templateFormProfile = document.getElementById("app").appendChild(formProfile);
const templateLinksProfile = document.getElementById("app").appendChild(linksProfile);

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
    type: "button",
    url: "/chating",
    label: "Сохранить изменения",
    id: "profileBtn",
});
const link = new Link({
    url: "/",
    title: "Удалить аккаунт",
});

const resultFormProfile = [
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
];

const resultLinksProfile = [button, link];

if (window.location.pathname === "/profile") {
    render(templateFormProfile, resultFormProfile);
    render(templateLinksProfile, resultLinksProfile);
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
    }
}


const currentFormProfile = {
    'first_name': '',
    'second_name': '',
    'login': '',
    'phone': '',
    'email': '',
    'display_name': '',
};

templateFormProfile.querySelectorAll("input").forEach((item) => {
    item.addEventListener("blur", (e) => {
        currentFormProfile.first_name = document.getElementById('profileName')?.value;
        currentFormProfile.second_name = document.getElementById('profileSecondName')?.value;
        currentFormProfile.login = document.getElementById('profileLogin')?.value;
        currentFormProfile.phone = document.getElementById('rprofilePhone')?.value;
        currentFormProfile.email = document.getElementById('profileMail')?.value;
        currentFormProfile.display_name = document.getElementById('profileUser')?.value;
        showError.showError("first_name", "errorName", e, validator);
        showError.showError("second_name", "errorSecondName", e, validator);
        showError.showError("login", "errorLogin", e, validator);
        showError.showError("phone", "errorPhone", e, validator);
        showError.showError("email", "errorMail", e, validator);
        showError.showError("display_name", "errorUser", e, validator);
        if (window.location.pathname === "/profile") { console.log('Текущие значения в форме: ', currentFormProfile) };
    });
});
templateFormProfile.querySelectorAll("input").forEach((item) => {
    item.removeEventListener("blur", () => { });
})

document.getElementById("formProfile").addEventListener("click", (e) => {
    // по клику генерируется submit
    e.preventDefault();
    e.stopPropagation();
    templateFormProfile.querySelectorAll("input").forEach((item) => {
        if (validator(item.name, item.value) && item.name === "first_name" || validator(item.name, item.value) && item.name === "second_name") {
            document.getElementById("errorName").style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === "login") {
            document.getElementById("errorLogin").style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === "phone") {
            document.getElementById("errorPhone").style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === "email") {
            document.getElementById("errorMail").style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === "display_name") {
            document.getElementById("errorUser").style.opacity = 1;
        }
    });
});