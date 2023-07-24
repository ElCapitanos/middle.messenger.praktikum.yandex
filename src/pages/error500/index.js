import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Subtitle from '../../components/subtitle/index';

function render(temp, arrBlock) {
    arrBlock.forEach((item) => {
        temp.appendChild(item.getContent());
    })
    return temp;
};

const template = document.getElementById('app');

const link = new Link({
    url: '/chating',
    title: 'На главную'
});
const title = new Title({
    text: 'Ошибка 500'
});
const subtitle = new Subtitle({
    text: 'Уже принимаем меры'
});
  const result = [title, subtitle, link]

if (window.location.pathname === '/error500') { 
    render(template, result)
}
