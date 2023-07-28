import Ava from '../../components/ava/index';
import chating from './chating.hbs';
import Card from '../../components/chatCard/index';
import users from '../../data/users';
import Subtitle from '../../components/subtitle/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import showError from '../../helpers/showError';
import validations from '../../helpers/validation';
import Message from '../../components/message/index';

function render(temp:HTMLElement, arrBlock:any) {
    if (temp) {
        arrBlock.forEach((item:any) => {
            temp.appendChild(item.getContent());
        });
        return temp;
    }
    return null; // для EsLint )
}

const errorMessage = new Error({
    message: errorMsg.messages.message,
    errorId: 'errorMessage',
    errorStyle: 'position:absolute;bottom:20px;'
});

const root:HTMLElement | any = document.querySelector('#app');
const result = chating();

if (window.location.pathname === '/chating') { root.innerHTML = result; }

const avatarTemplateHeader:HTMLElement | any = root?.querySelector('.main__ava');
const nameTemplateHeader:HTMLElement | any = root?.querySelector('.main__name');
const cardsTemplate:HTMLElement | any = root?.querySelector('.chat__cards');
const messageTemplate:HTMLElement | any = root?.querySelector('.main__chat');

const resultCards:Array<any> = [];
const messageCards:Array<any> = [];
let activeItemAva = '';
let activeItemName = '';
users.currentUsers.forEach((item) => {
    if (item.active) {
        activeItemAva = item.avaSrc;
        activeItemName = item.name;
        item.messages?.forEach((msg) => {
            if (msg.own) {
                const newMsg = new Message({
                    text: msg.own,
                    time: msg.time,
                    class: 'main__text_right'
                });
                messageCards.push(newMsg);
            } else {
                const newMsg = new Message({
                    text: msg.else,
                    time: msg.time,
                    class: 'main__text_left'
                });
                messageCards.push(newMsg);
            }
        });
    }
    const card = new Card({
        name: item.name,
        text: item.lastText,
        date: item.lastDate,
        amount: item.messageAmount,
        ava: item.avaSrc,
        active: item.active
    });
    resultCards.push(card);
});
const avatar = new Ava({
    class: 'ava_small',
    src: activeItemAva
});
const subtitle = new Subtitle({
    text: activeItemName
});

const resultName:Array<any> = [subtitle];
const resultAvatar:Array<any> = [avatar];
const errorText:Array<any> = [errorMessage];
render(avatarTemplateHeader, resultAvatar);
render(nameTemplateHeader, resultName);
render(cardsTemplate, resultCards);
render(messageTemplate, errorText);
render(messageTemplate, messageCards);

function validator(field:string, value:string) {
    return field === 'message' ? !validations.validations.message(value) : null;
}
if (document.querySelector('.main__input-text')) {
    document.querySelector('.main__input-text')?.addEventListener('blur', (e) => {
        showError('message', 'errorMessage', e, validator);
    });
}
if (document.querySelector('.main__input-text')) {
    document.querySelector('.main__input-text')?.removeEventListener('blur', () => { });
}
// @ts-ignore
document.getElementById('mainChat') ? document.getElementById('mainChat').scrollTop = document.getElementById('mainChat')?.scrollHeight : null;
