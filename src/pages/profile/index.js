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
const inputName = new Input({
    inputType: "text", 
    inputName: "first_name", 
    placeHolderText: "сменить\u00A0имя",
    inputId: "profileName"
});
const inputSecondName = new Input({
    inputType: "text", 
    inputName: "second_name", 
    placeHolderText: "сменить\u00A0фамилию",
    inputId: "profileSecondName"
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
    inputId: "profileUser"
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

const result = [title, ava, inputName, inputSecondName, inputLogin, inputPhone, inputMail, inputUser, button, link];

if (window.location.pathname === "/profile") { 
    render(template, result)
}
