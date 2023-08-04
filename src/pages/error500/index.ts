import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Subtitle from '../../components/subtitle/index';

function render(temp:HTMLElement, arrBlock:any) {
    arrBlock.forEach((item:any) => {
        temp.appendChild(item.getContent());
    });
    return temp;
}

const template:HTMLElement | any = document.getElementById('app');

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
const result:Array<any> = [title, subtitle, link];

if (window.location.pathname === '/error500') {
    render(template, result);
}
