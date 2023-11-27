import { v4 as uuid4 } from 'uuid';
import Handlebars from 'handlebars';
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

  protected children: any;

  protected list: any;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(tagName: string = 'div', propsWithChildren:PropsForComponent = {}) {
    const eventBus = new EventBus();
    const { props, children, list } = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props,
    };
    this.children = this._makePropsProxy(children);
    this.list = this._makePropsProxy(list);
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

    const { props, children, list } = this._getChildrenAndProps(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(list).length) {
      Object.assign(this.list, list);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }
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
    const list: any = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value[0] instanceof Block) {
        list[key] = value;
      } else {//@ts-ignore
        props[key] = value;
      }
    });

    return { props, children, list };
  }

  compile(template: (props: any) => string, props: any) {
    if (typeof props === 'undefined') {
      props = this._makePropsProxy;
    }

    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([name, child]) => {
      propsAndStubs[name] = `<div data-id="${child.id}"></div>`;
    });
    Object.entries(this.list).forEach(([name, child]) => {
      propsAndStubs[name] = `<div data-id="___l_${child}"></div>`;
    });

    const html:any = template(propsAndStubs);
    const temp:HTMLTemplateElement = document.createElement('template');
    temp.innerHTML = (typeof html === 'string') ? html.split(',').join('') : html; // чтобы запятые при выводе из массива не отображались
    // temp.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = temp.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.list).forEach(([key, child]) => {
      const stub = temp.content.querySelector(`[data-id="___l_${key}"]`);
      if (!stub) {
        return;
      }

      const listContent = this._createDocumentElement('template');

      child.forEach((item:any) => {
        if (item instanceof Block) {
          listContent.content.append(item.getContent());
        } else {
          listContent.content.append(`${item}`);
        }
      });
      stub.replaceWith(listContent.content);
    });

    return temp.content;
  }
}

export default Block;
