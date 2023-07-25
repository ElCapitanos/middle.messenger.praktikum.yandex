// import currentUsers from './../../data/users';
import card from './chatCard.hbs'
import Block from '../../utils/Block';
export default class Card extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return card({
            name: this.props.name,
            date: this.props.date,
            ava: this.props.ava ? this.props.ava : 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg',
            amount: this.props.amount,
            text: this.props.text,
            queu: this.props.amount ? 'display:block;' : 'display:none;',
            active: this.props.active ? 'background-color:rgba(0,0,0,.15);' : ''
    });
    }
}
