import {
  serverRequest
} from './backend.js';
import {
  createPicture,
  renderPicture
} from './pictures.js';
import {
  previewClickHandler
} from './preview.js';

const pictures = document.querySelector('.pictures');

const createGallery = (postList) => {
  for (const i in postList) {
    renderPicture(createPicture(postList[i]), pictures);
  }
  pictures.addEventListener('click', (e) => {
    previewClickHandler(e, postList);
  });
};

serverRequest((postList) => {
  createGallery(postList);
});
