import Title from '../../components/title/index';
import Link from '../../components/link/index';

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    });
    return temp;
}

const template = document.getElementById('app');

const link = new Link({
    url: '/chating',
    title: 'На главную'
});
const title = new Title({
    text: 'Страница не найдена 404'
});

const result = [title, link];

if (window.location.pathname !== '/' && window.location.pathname !== '/auth' && window.location.pathname !== '/error500' && window.location.pathname !== '/profile' && window.location.pathname !== '/chating' && window.location.pathname !== '/password-change' && window.location.pathname !== '/registration') {
    render(template, result);
}
