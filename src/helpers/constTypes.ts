export type StringObject = { [key:string]:string };
export type PropsForComponent = {
  active?: boolean,
  alt?: string,
  amount?: number,
  ava?: string,
  btnType?: string,
  class?: string,
  date?: string,
  disabled?: boolean,
  errorId?: string,
  errorStyle?: string,
  events?: object,
  id?: string,
  inputId?: string,
  inputName?: string,
  inputType?: string,
  label?: string,
  message?: string,
  name?: string,
  placeholder?: string,
  placeHolderText?: string,
  queu?: string,
  src?: string,
  text?: string,
  time?: string,
  title?: string,
  type?: string,
  url?: string,
};
export type Options = {
  data?: any,
  headers?: any,
  method?: any,
  timeout?: number;
};
export type HTTPMethod = (url: string, options?: Options) => Promise<unknown>
