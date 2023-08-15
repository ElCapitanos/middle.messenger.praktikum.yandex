import Block from './utils/Block';
import Error404 from './pages/error404';
import Error500 from './pages/error500';

/**
 * Роут
 */
export type Router = {
  path: string,
  component: Block,
};

const ready = () => {
  const Error404Page = new Error404();
  const Error500Page = new Error500();


  const ROUTES: Router[] = [
    // { path: '/', component: NewPageSample},
    { path: '/', component: Error500Page},
  ];

  // eslint-disable-next-line no-restricted-globals
  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
  const findComponentByPath = (path: string, routes: Router[]) => routes.find((route) => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

  const router = () => {
    const appElement = document.getElementById('app');
    if (!appElement) throw new Error('Не найдено элемента на странице с id "app"');

    // Находит компонент по текущему роуту
    const path = parseLocation();
    // Если роут не найден, показывает страницу 404
    const { component = Error404Page } = findComponentByPath(path, ROUTES) || {};

    const temp = component.getContent();

    if (!temp) throw new Error(`Не найдено элемента на странице с id ${component.id}}`);
    // Очищаем документ
    appElement.innerHTML = '';
    // Рендерим полученный компонент в документ
    appElement.append(temp);

    // const isChat = document.location.href.includes('#/chat/id') ? 'id' : undefined;
    // PageHomeComponent.setProps({ selectedChatId: isChat });
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
};

document.addEventListener('DOMContentLoaded', ready);
