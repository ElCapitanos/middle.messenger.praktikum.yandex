import passwordChange from './passwordChange.hbs';
import button from '../../components/button/button.hbs';
import link from '../../components/link/link.hbs';
import title from '../../components/title/title.hbs';
import password from '../../components/inputs/inputPassword.hbs';
import ava from '../../components/ava/ava.hbs';
import './passwordChange.scss';
import '../../components/button/button.scss';
import '../../components/link/link.scss';
import '../../components/title/title.scss';
import '../../components/inputs/input.scss';
import '../../components/ava/ava.scss';

const root = document.querySelector('#app');

const placeholderForOldPassword = 'старый' + `\u00A0` + 'пароль';
const placeholderForNewPassword = 'новый' + `\u00A0` + 'пароль';
const placeholderForCopyPassword = 'новый' + `\u00A0` + 'пароль' + `\u00A0` + '(еще' + `\u00A0` + 'раз)';

const btn1 = button({label: 'Сохранить изменения', url: `/chating`});
const btn2 = button({label: 'Отмена', url: `/profile`});
const h1 = title({text: 'Смена пароля'});
const face = ava({class: "ava"})
const lnk = link({url: `/`, title: `Удалить аккаунт`});
const oldPassword = password({placeHolderText: placeholderForOldPassword, name: 'password-old'});
const newPassword = password({placeHolderText: placeholderForNewPassword, name: 'password'});
const newPasswordCopy = password({placeHolderText: placeholderForCopyPassword, name: 'password-copy'});

const result = passwordChange({buttonChange: btn1, buttonBack: btn2, link: lnk, title: h1, ava: face, oldPassword: oldPassword, newPassword: newPassword, newPasswordCopy: newPasswordCopy });

root.innerHTML = result;