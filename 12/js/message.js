import {
  KEYS
} from './utils.js';

export const message = (type) => {
  const template = document
    .querySelector(`#${type}`)
    .content.querySelector(`.${type}`);
  const letter = template.cloneNode(true);
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
