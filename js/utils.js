const KEYS = {
  esc: 27
};
const DEFAULT_TIME = 500;

const createItem = (tag, className, text) => {
  const item = document.createElement(tag);
  item.classList.add(className);

  if (text) {
    item.textContent = `${text}`;
  }
  return item;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const debounce = (callback, timeOut = DEFAULT_TIME) => {
  let lastTimeout;
  return (...args) => {
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(() => callback.apply(this, args), timeOut);
  };
};

export { KEYS, debounce, shuffleArray, createItem };
