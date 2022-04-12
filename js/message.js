import {
  KEYS
} from './utils.js';

export const getMessage = (type) => {
  const templateElement = document
    .querySelector(`#${type}`)
    .content.querySelector(`.${type}`);
  const letter = templateElement.cloneNode(true);
  document.body.append(letter);

  const letterClickHandler = () => {
    letter.style.display = 'none';
  };

  const letterKeypressHandler = (e) => {
    if (e.keyCode === KEYS.esc) {
      letter.style.display = 'none';
    }
  };

  document.addEventListener('click', letterClickHandler);
  document.addEventListener('keydown', letterKeypressHandler);
};
