const KEYS = {
  esc: 27
}

const getRandInt = (min, max) => {
  if (min < 0 || max < 0) {
    return 'Рип. Оба числа должны быть больше нуля';
  }
  return Math.floor(min + Math.random() * (max - min + 1));
};

const getStrLen = (str, maxLen) => str.length <= maxLen;

const createItem = (tag, className, text) => {
  const item = document.createElement(tag);
  item.classList.add(className);

  if (text) {
    item.textContent = `${text}`;
  }
  return item;
};

export { KEYS, getRandInt, getStrLen, createItem };
