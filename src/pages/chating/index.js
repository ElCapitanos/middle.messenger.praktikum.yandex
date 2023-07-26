import Ava from '../../components/ava/index';
import chating from './chating.hbs';
import Card from './../../components/chatCard/index';
import users from './../../data/users';
import Subtitle from './../../components/subtitle/index';
import Error from '../../components/error';
import errorMsg from '../../data/errorMsg';
import showError from '../../helpers/showError';
import validations from "../../helpers/validation";

function render(temp, arrBlock) {
    if (temp) {
        arrBlock.forEach((item) => {
            temp.appendChild(item.getContent());
        })
        return temp;
    }
};

const errorMessage = new Error({
    message: errorMsg.messages.message,
    errorId: "errorMessage",
    errorStyle: "font-size:24px;"
});

const root = document.querySelector('#app');
const result = chating();

if (window.location.pathname === '/chating') { root.innerHTML = result; }

const avatarTemplateHeader = root.querySelector('.main__ava');
const nameTemplateHeader = root.querySelector('.main__name');
const cardsTemplate = root.querySelector('.chat__cards');
const errorTemplate = root.querySelector('.main__chat')

const resultCards = [];
let activeItemAva = '';
let activeItemName = '';
users.currentUsers.forEach((item) => {
    if (item.active) {
        activeItemAva = item.avaSrc;
        activeItemName = item.name;
    };
    const card = new Card({
        name: item.name,
        text: item.lastText,
        date: item.lastDate,
        amount: item.messageAmount,
        ava: item.avaSrc,
        active: item.active
    })
    resultCards.push(card)
})
const avatar = new Ava({
    class: "ava_small",
    src: activeItemAva
});
const subtitle = new Subtitle({
    text: activeItemName
});

const resultName = [subtitle];
const resultAvatar = [avatar];
const errorText = [errorMessage]
render(avatarTemplateHeader, resultAvatar);
render(nameTemplateHeader, resultName);
render(cardsTemplate, resultCards);
render(errorTemplate, errorText);


function validator(field, value) {
    if (field === "message") {
        return !validations.validations.message(value);
    }
};
if (document.querySelector('.main__input-text')) {
    document.querySelector('.main__input-text').addEventListener("blur", (e) => {
        showError.showError("message", "errorMessage", e, validator);
    })
}
if (document.querySelector('.main__input-text')) {
    document.querySelector('.main__input-text').removeEventListener("blur", () => { })
}