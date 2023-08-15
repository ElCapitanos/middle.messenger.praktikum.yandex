import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Subtitle from '../../components/subtitle/index';
import Block from '../../utils/Block';
import temp from './error500.hbs';
import Router from '../../utils/Router';

const router = new Router
const Link500 = new Link({
    events: {
        click: () => {
          router.go('/404');
        },
      },
    title: 'На главную'
});
const Title500 = new Title({
    text: 'Ошибка 500'
});
const Subtitle500 = new Subtitle({
    text: 'Уже принимаем меры'
});

class Error500 extends Block {
    constructor() {
        super('div', {//@ts-ignore
            attr: {
                classes: []
            },
            Title500,
            Subtitle500,
            Link500
        })
    }

    render() {
        return this.compile(temp, {
            Title500: this.children.Title500,
            Subtitle500: this.children.Subtitle500,
            Link500: this.children.Link500
        })
    }
}

export default Error500;
