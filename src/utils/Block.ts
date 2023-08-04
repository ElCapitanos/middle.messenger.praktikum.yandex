import EventBus from './EventBus';
import { PropsForComponent } from '../helpers/constTypes';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private _element: HTMLElement | null = null;

  private _meta: {
    tagName: string,
    props: PropsForComponent
  };

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(tagName: string = 'template', props: PropsForComponent = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
//@ts-ignore
    this.props = this._makePropsProxy(props);
//@ts-ignore
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));//@ts-ignore
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();//@ts-ignore
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {//@ts-ignore
    this.componentDidMount();//@ts-ignore
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps:PropsForComponent) { }

  _componentDidUpdate(oldProps:PropsForComponent, newProps:PropsForComponent) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps:PropsForComponent, newProps:PropsForComponent) {
    return true;
  }

  setProps = (nextProps:PropsForComponent) => {
    if (!nextProps) {
      return;
    }
//@ts-ignore
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _addEvents() {//@ts-ignore
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {//@ts-ignore
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {//@ts-ignore
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {//@ts-ignore
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }
  
  _render() {
    const block = this.render();
    this._removeEvents();//@ts-ignore
    this._element.innerHTML = '';//@ts-ignore
    this._element.innerHTML = block;
    this._addEvents();
  }

  render() { }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props:PropsForComponent) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {//@ts-ignore
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {//@ts-ignore
        target[prop] = value;//@ts-ignore
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {//@ts-ignore
    this.getContent().style.display = 'block';
  }

  hide() {//@ts-ignore
    this.getContent().style.display = 'none';
  }
}
