// import currentUsers from './../../data/users';
import card from './chatCard.hbs'
import Block from '../../utils/Block';
export default class Card extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return card();
    }
}

// function render(temp, arrBlock) {
//     // if (temp) {
//         arrBlock.forEach((item) => {
//             temp.appendChild(item.getContent());
//         })
//         // return temp;
//     // }
// };
// const root = document.querySelector('#app');
// console.log('/////', root)

// currentUsers.currentUsers.forEach((user) => {
//     const card = new Card({
//         // ava: user.avaSrc,
//         // name: user.name,
//         // message: user.lastText,
//         // date: user.lastDate,
//         // amount: user.messageAmount ? user.messageAmount : null
//     })
    // const result = [card];
    // render(root, result)
// })

