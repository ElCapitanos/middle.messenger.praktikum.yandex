import Block from './Block';

export default function renderApp(query: string, component: Block):any | null{
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('Элемент не найден');
  } else {
    const temp = component.getContent();
    if (!temp) throw new Error('Элемент не найден');
    root.appendChild(temp);
  }
  component.dispatchComponentDidMount();
  return root;
};
