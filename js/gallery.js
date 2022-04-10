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

const pictures = document.querySelector('.pictures');

const createGallery = (postList) => {
  for (const i in postList) {
    renderPicture(createPicture(postList[i]), pictures);
  }
  pictures.addEventListener('click', (e) => {
    previewClickHandler(e, postList);
  });
};

const deleteGallery = () => {
  const pictureItems = pictures.querySelectorAll('.picture');
  pictureItems.forEach((picture) => picture.remove());
};

serverRequest((postList) => {
  createGallery(postList);
  filters(postList);
});

export { createGallery, deleteGallery };
