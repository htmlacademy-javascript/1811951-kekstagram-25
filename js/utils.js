const KEYS = {
  esc: 27
};

const getRandInt = (min, max) => {
  if (min < 0 || max < 0) {
    return 'Рип. Оба числа должны быть больше нуля';
  }
  return Math.floor(min + Math.random() * (max - min + 1));
};

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

const debounce = (callback, timeOut = 500) => {
  let lastTimeout;
  return (...args) => {
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(() => callback.apply(this, args), timeOut);
  };
};

export { KEYS, getRandInt, debounce, shuffleArray, createItem };
