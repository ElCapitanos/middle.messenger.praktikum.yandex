import profile from './profile.hbs';
import button from '../../components/button/button.hbs';
import link from '../../components/link/link.hbs';
import title from '../../components/title/title.hbs';
import input from '../../components/inputs/input.hbs';
import ava from '../../components/ava/ava.hbs';
import './profile.scss';
import '../../components/button/button.scss';
import '../../components/link/link.scss';
import '../../components/title/title.scss';
import '../../components/inputs/input.scss';
import '../../components/ava/ava.scss';

const root = document.querySelector('#app');

const placeholderForFirstName = 'сменить' + `\u00A0` + 'имя';
const placeholderForSecondName = 'сменить' + `\u00A0` + 'фамилию';
const placeholderForLogin = 'сменить' + `\u00A0` + 'логин';
const placeholderForPhone = 'сменить' + `\u00A0` + 'телефон';
const placeholderForEmail = 'сменить' + `\u00A0` + 'e-mail';
const placeholderForUsername = 'сменить' + `\u00A0` + 'имя' + `\u00A0` + 'в' + `\u00A0` + 'чате';


const btn = button({label: 'Сохранить изменения', url: `/chating`});
const h1 = title({text: 'Профиль'});
const face = ava({class: "ava"})
const lnk = link({url: `/`, title: `Удалить аккаунт`});
const inputName = input({inputType: 'text', placeHolderText: placeholderForFirstName, inputName: 'first_name'});
const inputName2 = input({inputType: 'text', placeHolderText: placeholderForSecondName, inputName: 'second_name'});
const login = input({inputType: 'text', placeHolderText: placeholderForLogin, inputName: 'login'});
const phone = input({inputType: 'tel', placeHolderText: placeholderForPhone, inputName: 'phone'});
const email = input({inputType: 'email', placeHolderText: placeholderForEmail, inputName: 'email'});
const user = input({inputType: 'text', placeHolderText: placeholderForUsername , inputName: 'display_name'});
const result = profile({button: btn, link: lnk, title: h1, firstName: inputName, secondName: inputName2, login: login, phone: phone, email: email, ava: face, username: user});

root.innerHTML = result;