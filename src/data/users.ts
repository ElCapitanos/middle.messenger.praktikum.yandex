// @ts-ignore
import stringObject from '../helpers/constTypes';

const currentUsers: { name: string, lastText: string, lastDate: string, messageAmount: number, avaSrc: string, active?: boolean, messages?: Array<stringObject> }[] = [
  // {
  //   name: "Д'Артаньян",
  //   lastText: 'Каналья, тысяча чертей!',
  //   lastDate: '20.02.2023',
  //   messageAmount: 0,
  //   avaSrc: 'https://bookmix.ru/notes/images/3/3/8/notes_1588703519.jpg'
  // },
  // {
  //   name: 'Котики',
  //   lastText: 'Мур-мур-мур, мяу-мяу',
  //   lastDate: '20.02.2023',
  //   messageAmount: 2,
  //   avaSrc: 'https://memepedia.ru/wp-content/uploads/2017/04/%D0%BC%D0%B0%D0%BD%D1%83%D0%BB.jpg'
  // },
  {
    name: 'Гомер',
    lastText: 'М-м-м-м... пончики...',
    lastDate: '20.02.2023',
    messageAmount: 1,
    avaSrc: 'https://i.pinimg.com/originals/6a/b6/68/6ab668f8c2341f45c8f2d183bbcc8332.jpg',
    active: true,
    messages: [
      { own: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi autem veritatis eveniet?', time: '12:15' },
      { else: 'Lorem ipsum dolor sit amet.', time: '12:21' },
      { own: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A enim eligendi magnam, rerum, incidunt voluptatibus ratione voluptatum, tenetur soluta nam sapiente qui ab beatae repudiandae numquam vero atque cum? Eligendi dolorum necessitatibus, repudiandae cum sed blanditiis explicabo, totam voluptates ipsa deserunt esse dolore temporibus, vitae saepe sunt id.', time: '12:30' },
      { else: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim placeat officia perspiciatis ab, aut neque ipsam ex necessitatibus. Non, suscipit! Doloribus.', time: '12:41' },
      { own: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum.', time: '12:42' },
      { else: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim placeat officia perspiciatis ab, aut neque ipsam ex necessitatibus. Non, suscipit! Doloribus.', time: '12:43' },
      { else: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ea quas! Aperiam dolor esse laudantium quidem eius cumque odit neque numquam optio tenetur. Nam enim minus totam repellendus cumque? Ducimus quam nostrum assumenda molestiae facilis perferendis facere id quis velit illum.', time: '12:44' },
      { own: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim placeat officia perspiciatis ab, aut neque ipsam ex necessitatibus. Non, suscipit! Doloribus.', time: '12:48' },
      { own: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ea quas! Aperiam dolor esse laudantium quidem eius cumque odit neque numquam optio tenetur. Nam enim minus totam repellendus cumque? Ducimus quam nostrum assumenda molestiae facilis perferendis facere id quis velit illum.', time: '12:50' },
      { else: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut ab distinctio obcaecati?', time: '12:52' },
      { own: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ea quas! Aperiam dolor esse laudantium quidem eius cumque odit neque numquam optio tenetur. Nam enim minus totam repellendus cumque? Ducimus quam nostrum assumenda molestiae facilis perferendis facere id quis velit illum.', time: '12:56' },
      { own: 'М-м-м-м... пончики...', time: '12:58' }]
  },
  // {
  //   name: 'Большой Ух',
  //   lastText: 'Мы весёлые медузы...',
  //   lastDate: '20.02.2023',
  //   messageAmount: 0,
  //   avaSrc: 'https://avatars.dzeninfra.ru/get-zen_doc/3048507/pub_5ea036d83fdcda291b799f85_5ea036e9fd549001b4cdc023/scale_1200'
  // },
  // {
  //   name: 'Бендер',
  //   lastText: "Let's go get drunk!",
  //   lastDate: '20.02.2023',
  //   messageAmount: 0,
  //   avaSrc: 'https://img.championat.com/c/900x900/news/big/a/t/k-prodolzheniyu-futuramy-vernuli-golos-bendera_16462277951722648727.jpg'
  // },
  // {
  //   name: 'Dr. Zoidberg',
  //   lastText: 'Lyla, Robot!',
  //   lastDate: '20.02.2023',
  //   messageAmount: 0,
  //   avaSrc: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/futurama/f/f9/ZoidbergSpoof.jpg'
  // },
  // {
  //   name: 'Darth Vader',
  //   lastText: "I'm your father!",
  //   lastDate: '20.02.2023',
  //   messageAmount: 0,
  //   avaSrc: 'https://images.immediate.co.uk/production/volatile/sites/3/2020/12/Darth-Vader-David-Prowse-cab4049.jpg'
  // }
];

export default { currentUsers };
