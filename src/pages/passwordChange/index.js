import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Ava from '../../components/ava/index';

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
const inputOldPsw = new Input({
    inputType: "password",
    inputName: "password-old",
    placeHolderText: "старый\u00A0пароль",
    inputId: "oldPsw"
});
const inputNewPsw = new Input({
    inputType: "password",
    inputName: "password",
    placeHolderText: "новый\u00A0пароль",
    inputId: "newPsw"
});
const inputNewPswCopy = new Input({
    inputType: "password",
    inputName: "password",
    placeHolderText: "новый\u00A0пароль\u00A0(еще\u00A0раз)",
    inputId: "newPswCopy"
});

const title = new Title({
    text: "Смена пароля"
});
const buttonSave = new Button({
    class: "btn",
    type: "submit",
    url: "/chating",
    label: "Сохранить изменения",
    id: "saveBtn",
    // events: {
    //     click: event => {
    //         console.log(event.target);
    //     },
    // },
});
const buttonCancel = new Button({
    class: "btn",
    type: "submit",
    url: "/",
    label: "Отмена",
    id: "cancelBtn",
    // events: {
    //     click: event => {
    //         console.log(event.target);
    //     },
    // },
});
const link = new Link({
    url: '/',
    title: 'Удалить аккаунт'
});

const result = [title, ava, inputOldPsw, inputNewPsw, inputNewPswCopy, buttonSave, buttonCancel, link];

if (window.location.pathname === "/password-change") {
    render(template, result)
}
