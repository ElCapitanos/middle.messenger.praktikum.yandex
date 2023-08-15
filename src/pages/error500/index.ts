import Title from '../../components/title/index';
import Link from '../../components/link/index';
import Subtitle from '../../components/subtitle/index';
import Block from '../../utils/Block';
import temp from './error500.hbs';


const Link500 = new Link({
    url: '/chating',
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
        super('div', {
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
