import error from './error500.hbs';
import link from '../../components/link/link.hbs';
import title from '../../components/title/title.hbs';
import subtitle from '../../components/subtitle/subtitle.hbs';
import './error500.scss';
import '../../components/link/link.scss';
import '../../components/title/title.scss';
import '../../components/subtitle/subtitle.scss';

const root = document.querySelector('#app');

const h1 = title({ text: 'Ошибка 500' });
const h2 = subtitle({ text: 'Уже принимаем меры' });
const lnk = link({ url: '/', title: 'На главную' });
const result = error({ link: lnk, title: h1, subtitle: h2 });

if (window.location.pathname === 'error500') { root.innerHTML = result; }
