import Button from '../../components/button/index';
import Title from '../../components/title/index';
import Input from '../../components/inputs/index';
import Link from '../../components/link/index';
import Ava from '../../components/ava/index';
import Error from '../../components/error/index';
import errorMsg from '../../data/errorMsg';
import validations from '../../helpers/validation';
import showError from '../../helpers/showError';
import { StringObject } from '../../helpers/constTypes';
import Block from '../../utils/Block';
import Router from '../../utils/Router';
import temp from './profile.hbs';
import AuthController from '../../controllers/authController';
import UserController from '../../controllers/userController';

const router = new Router();

const AvaProfile = new Ava({
  class: 'ava',
  textClass: 'ava__text',
  events: {
    change: (e:any) => {
      onChange(e);
    }
  }
});
const ErrorNameProfile = new Error({
  message: errorMsg.messages.name,
  errorId: 'errorName'
});
const ErrorSecondNameProfile = new Error({
  message: errorMsg.messages.name,
  errorId: 'errorSecondName'
});
const ErrorLoginProfile = new Error({
  message: errorMsg.messages.login,
  errorId: 'errorLogin'
});
const ErrorPhoneProfile = new Error({
  message: errorMsg.messages.phone,
  errorId: 'errorPhone'
});
const ErrorMailProfile = new Error({
  message: errorMsg.messages.mail,
  errorId: 'errorMail'
});
const ErrorUserProfile = new Error({
  message: errorMsg.messages.name,
  errorId: 'errorUser'
});
const InputNameProfile = new Input({
  inputType: 'text',
  inputName: 'first_name',
  placeHolderText: 'сменить\u00A0имя',
  inputId: 'profileName',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    },
  }
});
const InputSecondNameProfile = new Input({
  inputType: 'text',
  inputName: 'second_name',
  placeHolderText: 'сменить\u00A0фамилию',
  inputId: 'profileSecondName',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    },
  }
});
const InputLoginProfile = new Input({
  inputType: 'text',
  inputName: 'login',
  placeHolderText: 'сменить\u00A0логин',
  inputId: 'profileLogin',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    },
  }
});
const InputPhoneProfile = new Input({
  inputType: 'tel',
  inputName: 'phone',
  placeHolderText: 'сменить\u00A0телефон',
  inputId: 'rprofilePhone',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    },
  }
});
const InputMailProfile = new Input({
  inputType: 'email',
  inputName: 'email',
  placeHolderText: 'сменить\u00A0e-mail',
  inputId: 'profileMail',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    },
  }
});
const InputUserProfile = new Input({
  inputType: 'text',
  inputName: 'display_name',
  placeHolderText: 'сменить\u00A0имя\u00A0в\u00A0чате',
  inputId: 'profileUser',
  events: {
    blur: (e:any) => {
      e.preventDefault();
      onBlur(e);
    },
  }
});
const TitleProfile = new Title({
  text: 'Профиль'
});
const ButtonProfile = new Button({
  class: 'btn',
  type: 'submit',
  label: 'Сохранить изменения',
  id: 'profileBtn',
  events: {
    click: (e:any) => {
      onSubmit(e);
    //   router.go('/messenger');
    },
  }
});
const LinkProfile = new Link({
  events: {
    click: () => {
      logout();
    }
  },
  title: 'Выйти из системы'
});

const LinkPasswordChange = new Link({
  events: {
    click: () => {
      router.go('/password-change');
    }
  },
  title: 'Сменить пароль'
});

function validator(field:string, value:string) {
  if (
    field === 'first_name'
    || field === 'second_name'
    || field === 'display_name'
  ) {
    return !validations.validations.name(value);
  } if (field === 'login') {
    return !validations.validations.login(value);
  } if (field === 'email') {
    return !validations.validations.mail(value);
  } if (field === 'phone') {
    return !validations.validations.phone(value);
  }
  return null; // для EsLint
}

const currentFormProfile:StringObject = {
  first_name: '',
  second_name: '',
  login: '',
  phone: '',
  email: '',
  display_name: '',
  avatar: ''
};

    //@ts-ignore
function onBlur(e:any) {
  currentFormProfile.first_name = document.getElementById('profileName')?.value;//@ts-ignore
  currentFormProfile.second_name = document.getElementById('profileSecondName')?.value;//@ts-ignore
  currentFormProfile.login = document.getElementById('profileLogin')?.value;//@ts-ignore
  currentFormProfile.phone = document.getElementById('rprofilePhone')?.value;//@ts-ignore
  currentFormProfile.email = document.getElementById('profileMail')?.value;//@ts-ignore
  currentFormProfile.display_name = document.getElementById('profileUser')?.value;
  showError('first_name', 'errorName', e, validator);
  showError('second_name', 'errorSecondName', e, validator);
  showError('login', 'errorLogin', e, validator);
  showError('phone', 'errorPhone', e, validator);
  showError('email', 'errorMail', e, validator);
  showError('display_name', 'errorUser', e, validator);
  if (window.location.pathname === '/profile') {
    console.log('Текущие значения в форме: ', currentFormProfile);
  }
}

function onChange(e:any) {
  currentFormProfile.avatar = e.target.value.replaceAll(/\\/g, '/');
}

function logout() {
  AuthController.logOut();
}

document.querySelectorAll('input').forEach((item:any) => {
  item.removeEventListener('blur', () => { });
});

function onSubmit(e:any) { // по клику генерируется submit
  e.preventDefault();
  e.stopPropagation();
  const templateFormProfile:HTMLElement | any = document?.getElementById('formProfile');
  let validErrorCounter:number = 0;
  templateFormProfile.querySelectorAll('input').forEach((item:any) => {
    if ((validator(item.name, item.value) && item.name === 'first_name')) {//@ts-ignore
      document.getElementById('errorName').style.opacity = 1;
      validErrorCounter++;
    }
    if ((validator(item.name, item.value) && item.name === 'second_name')) {//@ts-ignore
      document.getElementById('errorSecondName').style.opacity = 1;
      validErrorCounter++;
    }
    if (validator(item.name, item.value) && item.name === 'login') {//@ts-ignore
      document.getElementById('errorLogin').style.opacity = 1;
      validErrorCounter++;
    }
    if (validator(item.name, item.value) && item.name === 'phone') {//@ts-ignore
      document.getElementById('errorPhone').style.opacity = 1;
      validErrorCounter++;
    }
    if (validator(item.name, item.value) && item.name === 'email') {//@ts-ignore
      document.getElementById('errorMail').style.opacity = 1;
      validErrorCounter++;
    }
    if (validator(item.name, item.value) && item.name === 'display_name') {//@ts-ignore
      document.getElementById('errorUser').style.opacity = 1;
      validErrorCounter++;
    }
  });
  if (validErrorCounter === 0) {
    UserController.updateProfile(JSON.stringify(currentFormProfile));
    if (currentFormProfile.avatar) {
      UserController.updateAva(JSON.stringify(currentFormProfile));
    }
  }
  if (currentFormProfile.avatar) {
    UserController.updateAva(JSON.stringify(currentFormProfile));
  }
}

class Profile extends Block {
  constructor() {
    super('div', {//@ts-ignore
      attr: {
        classes: []
      },
      TitleProfile,
      AvaProfile,
      InputNameProfile,
      ErrorNameProfile,
      InputSecondNameProfile,
      ErrorSecondNameProfile,
      InputLoginProfile,
      ErrorLoginProfile,
      InputPhoneProfile,
      ErrorPhoneProfile,
      InputMailProfile,
      ErrorMailProfile,
      InputUserProfile,
      ErrorUserProfile,
      ButtonProfile,
      LinkProfile,
      LinkPasswordChange,
    })
  }

  render() {
    return this.compile(temp, {
      TitleProfile: this.children.TitleProfile,
      AvaProfile: this.children.AvaProfile,
      InputNameProfile: this.children.InputNameProfile,
      ErrorNameProfile: this.children.ErrorNameProfile,
      InputSecondNameProfile: this.children.InputSecondNameProfile,
      ErrorSecondNameProfile: this.children.ErrorSecondNameProfile,
      InputLoginProfile: this.children.InputLoginProfile,
      ErrorLoginProfile: this.children.ErrorLoginProfile,
      InputPhoneProfile: this.children.InputPhoneProfile,
      ErrorPhoneProfile: this.children.ErrorPhoneProfile,
      InputMailProfile: this.children.InputMailProfile,
      ErrorMailProfile: this.children.ErrorMailProfile,
      InputUserProfile: this.children.InputUserProfile,
      ErrorUserProfile: this.children.ErrorUserProfile,
      ButtonProfile: this.children.ButtonProfile,
      LinkProfile: this.children.LinkProfile,
      LinkPasswordChange: this.children.LinkPasswordChange,
    })
  }
}

export default Profile;
