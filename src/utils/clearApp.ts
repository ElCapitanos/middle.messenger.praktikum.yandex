export default function clearApp(query: string):void{
    const root = document.querySelector(query);
    if (!root) {
      throw new Error('Элемент не найден');
    }
    root.innerHTML = '';
  };
