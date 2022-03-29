import {
  postList
} from './posts.js';

const pictures = document.querySelector('.pictures');
const template = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createPicture = (postInfo) => {
  const el = template.cloneNode(true);
  el.id = postInfo.id;
  el.querySelector('.picture__img').src = postInfo.url;
  el.querySelector('.picture__likes').textContent = `${postInfo.likes}`;
  el.querySelector('.picture__comments').textContent = `${postInfo.comments.length}`;

  return el;
};

const renderPicture = (picture, container) => {
  const fragment = document.createDocumentFragment();
  fragment.append(picture);
  container.append(fragment);
};

for (const i in postList) {
  renderPicture(createPicture(postList[i]), pictures);
}
