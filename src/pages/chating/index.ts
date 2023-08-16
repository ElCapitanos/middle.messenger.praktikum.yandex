import Ava from '../../components/ava/index';
import temp from './chating.hbs';
import Card from '../../components/chatCard/index';
import users from '../../data/users';
import Subtitle from '../../components/subtitle/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import showError from '../../helpers/showError';
import validations from '../../helpers/validation';
import Message from '../../components/message/index';
import Input from '../../components/inputs/index';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import Link from '../../components/link/index';

const router = new Router;

const ResultCards:Array<any> = [];
const MessageCards:Array<any> = [];

let activeItemAva:string = '';
let activeItemName:string = '';

users.currentUsers.forEach((item:any) => {
    if (item.active) {
        activeItemAva = item.avaSrc;
        activeItemName = item.name;
        item.messages?.forEach((msg:any) => {
            if (msg.own) {
                const newMsg = new Message({
                    text: msg.own,
                    time: msg.time,
                    class: 'main__text_right'
                });
                MessageCards.push(newMsg);
            } else {
                const newMsg = new Message({
                    text: msg.else,
                    time: msg.time,
                    class: 'main__text_left'
                });
                MessageCards.push(newMsg);
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
    ResultCards.push(card);
});
const profileStr:string = `Профиль\u00A0\u279B`
const LinkChat = new Link({
    title: profileStr,
    class: 'chat__link',
    events: {
      click: () => {
        router.go('/profile');
      },
    }
});
const AvatarChat = new Ava({
    class: 'ava_small',
    src: activeItemAva
});
const ErrorMessageChat = new Error({
    message: errorMsg.messages.message,
    errorId: 'errorMessage',
    errorStyle: 'position:absolute;bottom:20px;'
});
const SubtitleChat = new Subtitle({
    text: activeItemName
});
const InputMessageChat = new Input({
    inputType: 'text',
    inputName: 'message',
    placeHolderText: 'введите\u00A0сообщение',
    inputId: 'enterMessage',
    class: 'main__input-text',
    events: {
      blur: (e:any) => {
        e.preventDefault();
        onBlur(e);
      }
    }
})

function validator(field:string, value:string) {
    return field === 'message' ? !validations.validations.message(value) : null;
}

function onBlur(e:any) {
    showError('message', 'errorMessage', e, validator);
}
//@ts-ignore
document.getElementById('mainChat') ? document.getElementById('mainChat').scrollTop = document.getElementById('mainChat')?.scrollHeight : null;
class Chating extends Block {
    constructor() {
        super('div', {//@ts-ignore
            attr: {
                classes: [],
            },
            AvatarChat,
            ErrorMessageChat,
            SubtitleChat,
            InputMessageChat,
            MessageCards,
            ResultCards,
            LinkChat
        })
    }
    render() {
        return this.compile(temp, {
          AvatarChat: this.children.AvatarChat,
          ErrorMessageChat: this.children.ErrorMessageChat,
          SubtitleChat: this.children.SubtitleChat,
          InputMessageChat: this.children.InputMessageChat,
          MessageCards: this.children.MessageCards,
          ResultCards: this.children.ResultCards,
          LinkChat: this.children.LinkChat
        })
    }
  }
  
  export default Chating;
