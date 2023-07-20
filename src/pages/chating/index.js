import chating from './chating.hbs';
import ava from '../../components/ava/ava.hbs';
import './chating.scss';
import '../../components/ava/ava.scss';

const root = document.querySelector('#app');
const face = ava({ class: 'ava_small' });
const result = chating({ ava: face });

if (window.location.pathname === '/chating') { root.innerHTML = result; }
