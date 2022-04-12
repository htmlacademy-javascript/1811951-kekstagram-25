import {
  KEYS, createItem
} from './utils.js';

const AVATAR = {
  width: 35,
  height: 35,
  alt: 'Культ коричневой субстанции'
};

const MAX_INIT_COMMENT_NUMBER = 5;
const previewElement = document.querySelector('.big-picture');
const pictureElement = previewElement.querySelector('.big-picture__img');
const descriptionElement = previewElement.querySelector('.social__caption');
const commentsListElement = previewElement.querySelector('.social__comments');
const commentsLoaderBtnElement = previewElement.querySelector('.social__comments-loader');
const buttonCloseElement = previewElement.querySelector('.big-picture__cancel');
let renderedCommentNumber = 0;

const createCommentAvatar = (comment) => {
  const avatar = createItem('img', 'social__picture');
  avatar.src = comment.avatar;
  avatar.alt = AVATAR.alt;
  avatar.width = AVATAR.width;
  avatar.height = AVATAR.height;

  return avatar;
};

const setCommentsCounter = (photo) => {
  const commentsCounter = document.querySelector('.social__comment-count');
  const commonCommentNumber = photo.comments.length;
  commentsCounter.innerHTML = `${renderedCommentNumber} из <span class="comments-count">${commonCommentNumber}</span> комментариев`;
};

const getNextRenderedCommentNumber = (
  renderedCommentNum,
  commonCommentNumber
) => {
  const notRenderedCommentNumber = commonCommentNumber - renderedCommentNum;
  return (
    renderedCommentNum +
    (notRenderedCommentNumber < MAX_INIT_COMMENT_NUMBER
      ? notRenderedCommentNumber
      : MAX_INIT_COMMENT_NUMBER)
  );
};

const createCommentList = (photo) => {
  const list = document.createDocumentFragment();
  const commentsNumber = photo.comments.length;
  const nextRenderedCommentNumber = getNextRenderedCommentNumber(
    renderedCommentNumber,
    commentsNumber
  );

  for (let i = renderedCommentNumber; i < nextRenderedCommentNumber; i++) {
    const listItem = createItem('li', 'social__comment');
    const avatar = createCommentAvatar(photo.comments[i]);
    const text = createItem('p', 'social__text', photo.comments[i].message);
    listItem.append(avatar);
    listItem.append(text);
    list.append(listItem);
  }

  renderedCommentNumber = nextRenderedCommentNumber;

  return list;
};

const setEventListeners = (photo) => {
  const commentsLoaderClickHandler = () => {
    commentsListElement.append(createCommentList(photo));
    setCommentsCounter(photo);

    if (photo.comments.length === renderedCommentNumber) {
      commentsLoaderBtnElement.classList.add('hidden');
      commentsLoaderBtnElement.removeEventListener(
        'click',
        commentsLoaderClickHandler
      );
    }
  };

  if (photo.comments.length <= MAX_INIT_COMMENT_NUMBER) {
    commentsLoaderBtnElement.classList.add('hidden');
  } else {
    commentsLoaderBtnElement.classList.remove('hidden');
    commentsLoaderBtnElement.addEventListener('click', commentsLoaderClickHandler);
  }

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    previewElement.classList.add('hidden');
  };

  const buttonCloseClickHandler = () => closeModal();
  const documentKeyDownHandler = (e) => {
    if (e.keyCode === KEYS.esc) {
      closeModal();
    }
  };

  buttonCloseElement.addEventListener('click', buttonCloseClickHandler);
  document.addEventListener('keydown', documentKeyDownHandler);
};

const showPreview = (photo) => {
  renderedCommentNumber = 0;
  commentsListElement.innerHTML = '';
  document.body.classList.add('modal-open');
  previewElement.classList.remove('hidden');
  pictureElement.querySelector('img').src = photo.url;
  pictureElement.querySelector('img').alt = 'Если ты слепой, то ты не видешь';
  previewElement.querySelector('.likes-count').textContent = `${photo.likes}`;
  descriptionElement.textContent = `${photo.description}`;
  commentsListElement.append(createCommentList(photo));
  setCommentsCounter(photo);
  setEventListeners(photo);
};

const previewClickHandler = (e, postList) => {
  const target = e.target;
  if (target.closest('.picture')) {
    const pictureId = target.closest('.picture').id;
    const post = postList[pictureId];
    showPreview(post);
  }
};

export { previewClickHandler };
