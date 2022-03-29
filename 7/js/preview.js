import {
  postList
} from './posts.js';
import {
  KEYS, createItem
} from './utils.js';

const AVATAR = {
  width: 35,
  height: 35,
  alt: 'Культ коричневой субстанции'
};

const pictures = document.querySelector('.pictures');
const preview = document.querySelector('.big-picture');
const picture = preview.querySelector('.big-picture__img');
const description = preview.querySelector('.social__caption');
const commentsList = preview.querySelector('.social__comments');
const commentsCounter = preview.querySelector('.social__comment-count');
const commentsLoaderBtn = preview.querySelector('.social__comments-loader');
commentsCounter.classList.add('hidden');
commentsLoaderBtn.classList.add('hidden');
const buttonClose = preview.querySelector('.big-picture__cancel');

const createCommentAvatar = (comment) => {
  const avatar = createItem('img', 'social__picture');
  avatar.src = comment.avatar;
  avatar.alt = AVATAR.alt;
  avatar.width = AVATAR.width;
  avatar.height = AVATAR.height;

  return avatar;
};

const createCommentList = (photo) => {
  const list = document.createDocumentFragment();
  const commentsNumber = photo.comments.length;

  for (let i = 0; i < commentsNumber; i++) {
    const listItem = createItem('li', 'social__comment');
    const avatar = createCommentAvatar(photo.comments[i]);
    const text = createItem('p', 'social__text', photo.comments[i].comment);
    listItem.append(avatar);
    listItem.append(text);
    list.append(listItem);
  }
  return list;
};

const buttonCloseClickHandler = () => closeModal();

const documentKeyDownHandler = (e) => {
  if (e.keyCode === KEYS.esc) {
    closeModal();
  }
};

function closeModal() {
  document.body.classList.remove('modal-open');
  preview.classList.add('hidden');
}

const showPreview = (photo) => {
  commentsList.innerHTML = '';
  document.body.classList.add('modal-open');
  preview.classList.remove('hidden');
  picture.querySelector('img').src = photo.url;
  picture.querySelector('img').alt = 'Если ты слепой, то ты не видешь';
  preview.querySelector('.likes-count').textContent = `${photo.likes}`;
  description.textContent = `${photo.description}`;
  commentsList.append(createCommentList(photo));
  buttonClose.addEventListener('click', buttonCloseClickHandler);
  document.addEventListener('keydown', documentKeyDownHandler);
};

const previewClickHandler = (e) => {
  const target = e.target;
  if (target.closest('.picture')) {
    const pictureId = target.closest('.picture').id;
    const post = postList[pictureId - 1];
    showPreview(post);
  }
};

pictures.addEventListener('click', previewClickHandler);
