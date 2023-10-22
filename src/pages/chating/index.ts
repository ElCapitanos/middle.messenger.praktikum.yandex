import Ava from '../../components/ava/index';
import temp from './chating.hbs';
import Card from '../../components/chatCard/index';
// import users from '../../data/users';
import Subtitle from '../../components/subtitle/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import showError from '../../helpers/showError';
import validations from '../../helpers/validation';
// import Message from '../../components/message/index';
import Input from '../../components/inputs/index';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import Link from '../../components/link/index';
import Button from '../../components/button/index';
import chatController from '../../controllers/chatController';
import userController from '../../controllers/userController';
import { ChatCreateDataType } from '../../helpers/constTypes';
import userList from '../../data/userList';
// import isEqual from '../../utils/isEqual';
import store from '../../utils/store';
import { withChats } from '../../utils/useStore';


const router = new Router();

const ResultCards:Array<any> = [{title: 1}, {title: 2}];
const MessageCards:Array<any> = [];

let activeItemAva:string = '';
let activeItemName:string = '';
let chats:Array<any> = [];


// chats.forEach((item:any) => {
//   const card = new Card({
//     name: item.title
//   });
//   ResultCards.push(card);
// });

// chatController.getChatList(0, 0, '').then(() => {
//   chats = store.getState().chats;
//   if (ResultCards.length !== chats.length) {
//     ResultCards.length = 0;
//     chats.forEach((item:any) => {
//       const card = new Card({
//         name: item.title
//       });
//       // card.setProps({ name: item.title });
//       ResultCards.push(card);
//     });
//   }
// });

  // users.currentUsers.forEach((item:any) => {
  //   if (item.active) {
  //     activeItemAva = item.avaSrc;
  //     activeItemName = item.name;
  //     item.messages?.forEach((msg:any) => {
  //       if (msg.own) {
  //         const newMsg = new Message({
  //           text: msg.own,
  //           time: msg.time,
  //           class: 'main__text_right'
  //         });
  //         MessageCards.push(newMsg);
  //       } else {
  //         const newMsg = new Message({
  //           text: msg.else,
  //           time: msg.time,
  //           class: 'main__text_left'
  //         });
  //         MessageCards.push(newMsg);
  //       }
  //     });
  //   }
  //   const card = new Card({
  //     name: item.name,
  //     text: item.lastText,
  //     date: item.lastDate,
  //     amount: item.messageAmount,
  //     ava: item.avaSrc,
  //     active: item.active,
  //   });
  //   ResultCards.push(card);
  // });


const CreateChatButton = new Button({
  class: 'chat__create-btn',
  type: 'button',
  label: 'Создать новый чат',
  id: 'createChatBtn',
  events: {
    click: () => {
      createChat();
    }
  }
});

const BtnNeededUser = new Button({
  class: 'chat__add-btn',
  type: 'button',
  label: 'Продолжить',
  id: 'btnNeededUser',
  events: {
    click: () => {
      toggleHiddensElem(document.getElementById('BtnsToMgmt'));
    }
  }
});
const BtnToRemove = new Button({
  class: 'chat__add-btn',
  type: 'button',
  label: 'Удалить пользователя',
  id: 'btnToRemoveUser',
  events: {
    click: () => {
      usersChatMgmt('del');
    }
  }
});
const BtnToAdd = new Button({
  class: 'chat__add-btn',
  type: 'button',
  label: 'Добавить пользователя',
  id: 'btnToAddUser',
  events: {
    click: () => {
      usersChatMgmt('add');
    }
  }
});

const profileStr:string = `Профиль\u00A0\u279B`;
const LinkChat = new Link({
  title: profileStr,
  class: 'chat__link',
  events: {
    click: () => {
      router.go('/settings');
    },
  }
});

const newChatLinkText: string = `Создать\u00A0\новый\u00A0\чат`
const NewChatLink = new Link({
  title: newChatLinkText,
  class: 'chat__link',
  events: {
    click: () => {
      toggleHiddensElem(document.getElementById('titleForChat'));
    }
  }
});
const usersLinkText: string = `Управление\u00A0\пользователями`
const UsersMgmtLink = new Link({
  title: usersLinkText,
  class: 'chat__link',
  events: {
    click: () => {
      toggleHiddensElem(document.getElementById('usersMgmt'));
    }
  }
});
const AvatarChat = new Ava({
  class: 'ava_small',
  textClass: 'ava__text_none',
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

const InputNewChatName = new Input({
  inputType: 'text',
  inputName: 'chatName',
  placeHolderText: 'введите\u00A0имя\u00A0чата',
  inputId: 'enterChatName',
  class: 'chat__input-name',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      setChatName(e);
    }
  }
})

const InputNeededChat = new Input({
  inputType: 'text',
  inputName: 'neededChatName',
  placeHolderText: 'введите\u00A0имя\u00A0нужного\u00A0чата',
  inputId: 'enterNeededChatName',
  class: 'chat__input-name',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      setNeededChatName(e);
    }
  }
})

const InputNeededUser = new Input({
  inputType: 'text',
  inputName: 'neededUserName',
  placeHolderText: 'введите\u00A0имя\u00A0пользователей\u00A0через\u00A0запятую',
  inputId: 'enterNeededUserName',
  class: 'chat__input-name',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      setNeededUserName(e);
    }
  }
})

function validator(field:string, value:string) {
  return field === 'message' ? !validations.validations.message(value) : null;
}

let newChatTitle:string = 'New Chat';

function setChatName(e:any) {
  newChatTitle = e.target.value.trim();
}

let chatToAdd:number = 0;
let chatToAddName:string = '';
function setNeededChatName(e:any) {
  chatToAdd = 0;
  chatController.getChatList(0, 0, '').then(() => {
    chatList.forEach((item:any) => {
      if (item.title.trim().toLowerCase() === e.target.value.trim().toLowerCase()) {
        chatToAdd = item.id;
        chatToAddName = item.title.trim();
        return;
      }
    });
    let messageToAlert:string = 'Теперь введите в соотв. поле имена пользователей (через запятую), которых вы хотите добавить в чат "' + chatToAddName + '"';
    chatToAdd === 0 ? alert('Чата с таким именем не найдено, проверьте правильность написания.') : alert(messageToAlert);
  });
}

const usersToMgmt:number[] = [];
function setNeededUserName(e) {
  let currentUsersArr:string[] = e.target.value.split(',');
  currentUsersArr.forEach((item) => {
    userController.searchUser(JSON.stringify({login: item.trim()})).then(() => {
      if (userList[0].login === item) {
        usersToMgmt.push(userList[0].id);
      }
    });
  });
}

function usersChatMgmt(action:string) {
  if (!usersToMgmt.length || !chatToAdd) {
    alert('Чат и (или) пользователи не найдены');
  } else {
    const data:object = { users: usersToMgmt, chatId: chatToAdd };
    if (action === 'del') {
      chatController.removeUsersFromChat(JSON.stringify(data));
    } else {
      chatController.addUsersToChat(JSON.stringify(data));
    }
  }
}

function toggleHiddensElem(elem:HTMLElement) {
  elem.style.display === 'flex' ? elem.style.display = 'none' : elem.style.display = 'flex';
}

function createChat() {
  const data:ChatCreateDataType = { title: newChatTitle };

//   chatController.createChat(JSON.stringify(data)).then(() => {
    chatController.getChatList(0, 0, '').then(() => {
      const chats:Array<any> = store.getState().chats;
        chats.forEach((item) => {
          item.setProps({name: item.title});
          ResultCards.push(item)
        })
    })
//   });
  toggleHiddensElem(document.getElementById('titleForChat'));
  document.getElementById('enterChatName').value = '';
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
        classes: []
      },
      AvatarChat,
      ErrorMessageChat,
      SubtitleChat,
      InputMessageChat,
      MessageCards,
      ResultCards,
      LinkChat,
      NewChatLink,
      InputNewChatName,
      CreateChatButton,
      UsersMgmtLink,
      InputNeededChat,
      InputNeededUser,
      BtnNeededUser,
      BtnToRemove,
      BtnToAdd
    });
  }

  render() {
    return this.compile(temp, {
      AvatarChat: this.children.AvatarChat,
      ErrorMessageChat: this.children.ErrorMessageChat,
      SubtitleChat: this.children.SubtitleChat,
      InputMessageChat: this.children.InputMessageChat,
      MessageCards: this.children.MessageCards,//@ts-ignore
      ResultCards: this.props.ResultCards,
      LinkChat: this.children.LinkChat,
      NewChatLink: this.children.NewChatLink,
      InputNewChatName: this.children.InputNewChatName,
      CreateChatButton: this.children.CreateChatButton,
      UsersMgmtLink: this.children.UsersMgmtLink,
      InputNeededChat: this.children.InputNeededChat,
      InputNeededUser: this.children.InputNeededUser,
      BtnNeededUser: this.children.BtnNeededUser,
      BtnToRemove: this.children.BtnToRemove,
      BtnToAdd: this.children.BtnToAdd
    })
  }
}

export default withChats(Chating);
