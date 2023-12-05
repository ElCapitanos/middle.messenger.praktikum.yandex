import { v4 as uuid4 } from 'uuid';
import EventBus from './EventBus';
import { PropsForComponent } from '../helpers/constTypes';

class Block {
  static EVENTS = {
    INIT: 'init',
    CDM: 'flow:component-did-mount',
    CDU: 'flow:component-did-update',
    RENDER: 'flow:render',
  };

  id = uuid4();

  props: PropsForComponent;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _meta: {
    tagName: string;
    props: PropsForComponent;
  };

  protected children: Record<string, Block | Block[]>;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(tagName: string = 'div', propsWithChildren:PropsForComponent = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props,
    };//@ts-ignore
    this.children = this._makePropsProxy(children);
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.CDM, this._componentDidMount.bind(this));//@ts-ignore
    eventBus.on(Block.EVENTS.CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.CDM);
  }

  _componentDidUpdate(oldProps:PropsForComponent, newProps:PropsForComponent) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.RENDER);
    }
  }

  componentDidUpdate(oldProps:PropsForComponent, newProps:PropsForComponent) {
    return true;
  }

  setProps = (nextProps: object): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  getProps():PropsForComponent {
    return this.props;
  }

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };
    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element!.innerHTML = '';//@ts-ignore
    this._element!.append(block);
    this._addEvents();
  }

  render() { }

  getContent():HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props:PropsForComponent) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {//@ts-ignore
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };//@ts-ignore
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    const content = this.getContent();

    if (content) {
      content.style.display = 'block';
    } else {
      throw new Error('Элемент не найден');
    }
  }

  hide() {
    const content = this.getContent();

    if (content) {
      content.style.display = 'none';
    } else {
      throw new Error('Элемент не найден');
    }
  }

  _createDocumentElement(tagName: string) {
    const documentElement = document.createElement(tagName);//@ts-ignore
    const attributes = this.props.attr;
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        const value = attributes[key];
        if (key === 'classes' && Array.isArray(value)) {
          value.forEach((item) => {
            documentElement.classList.add(item);
          });
        } else if (typeof value === 'string') {
          documentElement.setAttribute(key, value);
        }
      });
    }

    return documentElement;
  }

  _getChildrenAndProps(childrenAndProps:PropsForComponent) {
    const props:PropsForComponent = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if(Array.isArray(value)) {
        children[key] = value;
      }  else {//@ts-ignore
        props[key] = value;
      }
    });
    
    return { props, children };
  }
  
  compile(template: (context: any) => string, context: any) {
    const contextAndPlugs = { ...context };
    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        console.log('/*/**/', component)
        console.log('/////', component.length)
        const result: string[] = [];
        component.forEach((item) => { 
          result.push(`<div data-id="${item.id}"></div>`); 
        });
        contextAndPlugs[name] = result;
      } else {
        contextAndPlugs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html:any = template(contextAndPlugs);
    const temp:HTMLTemplateElement = document.createElement('template');
    temp.innerHTML = (typeof html === 'string') ? html.split(',').join('') : html; // чтобы запятые при выводе из массива не отображались

    Object.entries(this.children).forEach(([, component]) => {
      if (Array.isArray(component)) {
        component.forEach((item) => {//@ts-ignore
          Block.renderPlug(item, temp);
        });
      } else {//@ts-ignore
        Block.renderPlug(component, temp);
      }
    });

    return temp.content;
  }

  static renderPlug(component: Block, temp: HTMLTemplateElement) {
    const plug = temp.content.querySelector(`[data-id="${component.id}"]`);

    if (!plug) {
      return;
    }
//@ts-ignore
    plug.replaceWith(component.getContent());
  }
}

export default Block;
