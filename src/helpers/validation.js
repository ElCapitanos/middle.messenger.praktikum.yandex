const validations = {
    login: (value) => /^([\da-zA-Z\-_]{3,20})$/.test(value) && !/^\d+$/.test(value),
    password: (value) => /^(.{8,40})$/.test(value) && /\d+/.test(value) && /[A-Z]+|[А-Я]/.test(value),
    name: (value) => /^[A-ZА-Я]/.test(value) && /^[A-Za-zА-Яа-я/-]{0,}$/.test(value),
    mail: (value) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,5}$/.test(value),
    phone: (value) => /^\+?\d{10,15}$/.test(value),
    message: (value) => !!value.trim(),
  };
  
  export default { validations }
