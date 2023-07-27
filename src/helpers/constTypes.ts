export type StringObject = { [key:string]:string };
export type PropsForComponent = {
  id?: string,
  type?: string,
  name?: string,
  class?: string,
  placeholder?: string,
  src?: string,
  alt?: string,
  date?: string,
  ava?: string,
  amount?: number,
  text?: string,
  queu?: string,
  active?: boolean,
  disabled?: boolean,
  label?: string,
  url?: string,
  btnType?: string,
  message: string,
  errorId: string,
  errorStyle: string,
  inputName: string,
  placeHolderText: string,
  inputType: string,
  inputId: string,
  events: object,
  title: string,
  time: string 
};
export type Options = {
  timeout?: number;
  headers?: any,
  method?: any,
  data?: any,
};
