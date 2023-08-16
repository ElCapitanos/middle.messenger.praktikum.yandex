import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Block from '../../utils/Block';
import temp from './error404.hbs';
import Router from './../../utils/Router';

const router = new Router;
const Link404:any = new Link({
    events: {
        click: () => {
          router.go('/messenger');
        },
      },
    title: 'На главную'
});
const Title404:any = new Title({
    text: 'Страница не найдена 404'
});

class Error404 extends Block {
    constructor() {
        super('div', {//@ts-ignore
            attr: {
                classes: [],
            },
            Title404,
            Link404
        })
    }

    render() {
        return this.compile(temp, {
            Title404: this.children.Title404,
            Link404: this.children.Link404
        })
    }
}

export default Error404;
