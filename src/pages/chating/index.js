import Ava from '../../components/ava/index';
import chating from './chating.hbs';
import Card from './../../components/chatCard/index'

function render(temp, arrBlock) {
    if (temp) {
        arrBlock.forEach((item) => {
            temp.appendChild(item.getContent());
        })
        return temp;
    }
};
const avatar = new Ava({
    class: "ava_small"
});

const card = new Card({});
const root = document.querySelector('#app');
const result = chating();

if (window.location.pathname === '/chating') { root.innerHTML = result; }

const avatarTemplateHeader = root.querySelector('.main__ava');
const cardsTemplate = root.querySelector('.chat__cards')
const resultAvatar = [avatar];
const resultCards = [card]
render(avatarTemplateHeader, resultAvatar)
render(cardsTemplate, resultCards)

// avatarTemplateCard.forEach((item) => {
//     const ava = new Ava({
//         class: "ava_small"
//     });
//     const resultAvatar = [ava];
//     render(item, resultAvatar)
// })