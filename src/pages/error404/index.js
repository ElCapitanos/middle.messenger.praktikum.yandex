import error from './error404.hbs';
import link from '../../components/link/link.hbs';
import title from '../../components/title/title.hbs';
import './error404.scss';
import '../../components/link/link.scss';
import '../../components/title/title.scss';

const root = document.querySelector('#app');

const h1 = title({text: 'Страница не найдена 404'});
const lnk = link({url: `/`, title: `На главную`});
const result = error({link: lnk, title: h1 });

if (window.location.pathname !== '/' && window.location.pathname !=='/auth' && window.location.pathname !=='/error500' && window.location.pathname !=='/profile' && window.location.pathname !=='/chating' && window.location.pathname !=='/passwordChange' && window.location.pathname !=='/registration') {root.innerHTML = result};
