import auth from './auth.hbs';
import button from '../../components/button/button.hbs';
import link from '../../components/link/link.hbs';
import title from '../../components/title/title.hbs';
import input from '../../components/inputs/input.hbs';
import password from '../../components/inputs/inputPassword.hbs';
import './auth.scss';
import '../../components/button/button.scss';
import '../../components/link/link.scss';
import '../../components/title/title.scss';
import '../../components/inputs/input.scss';

const root = document.querySelector('#app');

const btn = button({label: 'Войти', url: `/`, btnType: 'submit'});
const h1 = title({text: 'Вход'});
const lnk = link({url: `/registration`, title: `Зарегистрироваться`});
const inputText = input({inputType: 'text', placeHolderText: 'логин', inputName: 'login'});
const psw = password({placeHolderText: 'пароль', name: 'password'});
const result = auth({button: btn, link: lnk, title: h1, input: inputText, password: psw });

if (window.location.pathname === '/' || window.location.pathname ==='/auth') {root.innerHTML = result};
