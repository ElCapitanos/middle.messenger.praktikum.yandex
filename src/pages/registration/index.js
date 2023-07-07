import registration from './registration.hbs';
import button from '../../components/button/button.hbs';
import link from '../../components/link/link.hbs';
import title from '../../components/title/title.hbs';
import input from '../../components/inputs/input.hbs';
import password from '../../components/inputs/inputPassword.hbs';
import './registration.scss';
import '../../components/button/button.scss';
import '../../components/link/link.scss';
import '../../components/title/title.scss';
import '../../components/inputs/input.scss';

const root = document.querySelector('#app');

const placeholderForPassword = 'пароль' + `\u00A0` + '(еще' + `\u00A0` + 'раз)'

const btn = button({label: 'Зарегистрироваться', url: `/chating`});
const h1 = title({text: 'Регистрация'});
const lnk = link({url: `/chating`, title: `Войти`});
const inputName = input({inputType: 'text', placeHolderText: 'имя', inputName: 'first_name'});
const inputName2 = input({inputType: 'text', placeHolderText: 'фамилия', inputName: 'second_name'});
const login = input({inputType: 'text', placeHolderText: 'логин', inputName: 'login'});
const phone = input({inputType: 'tel', placeHolderText: 'телефон', inputName: 'phone'});
const email = input({inputType: 'email', placeHolderText: 'e-mail', inputName: 'email'});
const psw = password({placeHolderText: 'пароль', name: 'password'});
const psw2 = password({placeHolderText: placeholderForPassword, name: 'passwordCopy'});
const result = registration({button: btn, link: lnk, title: h1, inputName: inputName, inputName2: inputName2, login: login, phone: phone, email: email, password: psw, password2: psw2, });

if (window.location.pathname === '/registration') {root.innerHTML = result};