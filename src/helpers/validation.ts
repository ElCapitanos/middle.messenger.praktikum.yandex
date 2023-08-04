const validations = {
  login: (value:string) => /^([\da-zA-Z\-_]{3,20})$/.test(value) && !/^\d+$/.test(value),
  password: (value:string) => /^(.{8,40})$/.test(value) && /\d+/.test(value) && /[A-Z]+|[А-Я]/.test(value),
  name: (value:string) => /^[A-ZА-Я]/.test(value) && /^[A-Za-zА-Яа-я/-]{0,}$/.test(value),
  mail: (value:string) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,5}$/.test(value),
  phone: (value:string) => /^\+?\d{10,15}$/.test(value),
  message: (value:string) => !!value.trim()
};

export default { validations };
