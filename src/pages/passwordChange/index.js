import Button from "../../components/button/index";
import Title from "../../components/title/index";
import Input from "../../components/inputs/index";
import Link from "../../components/link/index";
import Ava from "../../components/ava/index";
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
form.id = "passwordForm";
const template = document.getElementById("app").appendChild(form);

const ava = new Ava({
    class: "ava",
});
const inputOldPsw = new Input({
    inputType: "password",
    inputName: "password",
    placeHolderText: "старый\u00A0пароль",
    inputId: "password",
});
const inputNewPsw = new Input({
    inputType: "password",
    inputName: "passwordCopy",
    placeHolderText: "новый\u00A0пароль",
    inputId: "passwordCopy",
});
const inputNewPswCopy = new Input({
    inputType: "password",
    inputName: "passwordNewCopy",
    placeHolderText: "новый\u00A0пароль\u00A0(еще\u00A0раз)",
    inputId: "passwordNewCopy",
});
const errorPassword = new Error({
    message: errorMsg.messages.password,
    errorId: "errorPassword",
});
const errorPasswordCopy = new Error({
    message: errorMsg.messages.passwordCopy,
    errorId: "errorPasswordCopy",
});
const errorPasswordNewCopy = new Error({
    message: errorMsg.messages.passwordCopy,
    errorId: "errorPasswordNewCopy",
});
const title = new Title({
    text: "Смена пароля",
});
const buttonSave = new Button({
    class: "btn",
    type: "submit",
    // url: "/chating",
    label: "Сохранить изменения",
    id: "saveBtn",
});
const buttonCancel = new Button({
    class: "btn",
    type: "button",
    url: "/",
    label: "Отмена",
    id: "cancelBtn",
});
const link = new Link({
    url: "/",
    title: "Удалить аккаунт",
});

const result = [
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
    link,
];

if (window.location.pathname === "/password-change") {
    console.log("/**/*/*", template);
    render(template, result);
}

function validator(field, value) {
    if (field === "password") {
        return !validations.validations.password(value);
    } else if (field === "passwordCopy") {
        return value !== document.getElementById("password").value;
    } else if (field === "passwordNewCopy") {
        return value !== document.getElementById("passwordCopy").value;
    }
}

const currentFormPasswordChange = {
    password: "",
    passwordCopy: "",
    passwordNewCopy: "",
};
template.querySelectorAll("input").forEach((item) => {
    item.addEventListener("blur", (e) => {
        currentFormPasswordChange.password =
            document.getElementById("password")?.value;
        currentFormPasswordChange.passwordCopy =
            document.getElementById("passwordCopy")?.value;
        currentFormPasswordChange.passwordNewCopy =
            document.getElementById("passwordNewCopy")?.value;
        showError.showError("password", "errorPassword", e, validator);
        showError.showError("passwordCopy", "errorPasswordCopy", e, validator);
        showError.showError(
            "passwordNewCopy",
            "errorPasswordNewCopy",
            e,
            validator
        );
        if (window.location.pathname === "/password-change") {
            console.log(
                "Текущие значения в форме: ",
                currentFormPasswordChange
            );
        }
    });
});
template.querySelectorAll("input").forEach((item) => {
    item.removeEventListener("blur", () => {});
});

document.getElementById("passwordForm").addEventListener("click", (e) => {
    // по клику генерируется submit
    e.preventDefault();
    e.stopPropagation();
    template.querySelectorAll("input").forEach((item) => {
        if (validator(item.name, item.value) && item.name === "password") {
            document.getElementById("errorPassword").style.opacity = 1;
        }
        if (validator(item.name, item.value) && item.name === "passwordCopy") {
            document.getElementById("errorPasswordCopy").style.opacity = 1;
        }
        if (
            validator(item.name, item.value) &&
            item.name === "passwordNewCopy"
        ) {
            document.getElementById("errorPasswordNewCopy").style.opacity = 1;
        }
    });
});
