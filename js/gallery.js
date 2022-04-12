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
import { filters } from './filters.js';

const picturesElement = document.querySelector('.pictures');

const createGallery = (postList) => {
  for (const i in postList) {
    renderPicture(createPicture(postList[i]), picturesElement);
  }
};

const deleteGallery = () => {
  const pictureItemsElement = picturesElement.querySelectorAll('.picture');
  pictureItemsElement.forEach((picture) => picture.remove());
};

serverRequest((postList) => {
  createGallery(postList);
  filters(postList);
  picturesElement.addEventListener('click', (e) => {
    previewClickHandler(e, postList);
  });
});

export { createGallery, deleteGallery };
