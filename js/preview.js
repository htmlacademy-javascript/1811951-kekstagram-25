import {
  KEYS, createItem
} from './utils.js';

const AVATAR = {
  width: 35,
  height: 35,
  alt: 'Культ коричневой субстанции'
};

const MAX_INIT_COMMENT_NUMBER = 5;
const preview = document.querySelector('.big-picture');
const picture = preview.querySelector('.big-picture__img');
const description = preview.querySelector('.social__caption');
const commentsList = preview.querySelector('.social__comments');
const commentsLoaderBtn = preview.querySelector('.social__comments-loader');
const buttonClose = preview.querySelector('.big-picture__cancel');
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
    commentsList.append(createCommentList(photo));
    setCommentsCounter(photo);

    if (photo.comments.length === renderedCommentNumber) {
      commentsLoaderBtn.classList.add('hidden');
      commentsLoaderBtn.removeEventListener(
        'click',
        commentsLoaderClickHandler
      );
    }
  };

  if (photo.comments.length <= MAX_INIT_COMMENT_NUMBER) {
    commentsLoaderBtn.classList.add('hidden');
  } else {
    commentsLoaderBtn.classList.remove('hidden');
    commentsLoaderBtn.addEventListener('click', commentsLoaderClickHandler);
  }

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    preview.classList.add('hidden');
  };

  const buttonCloseClickHandler = () => closeModal();
  const documentKeyDownHandler = (e) => {
    if (e.keyCode === KEYS.esc) {
      closeModal();
    }
  };

  buttonClose.addEventListener('click', buttonCloseClickHandler);
  document.addEventListener('keydown', documentKeyDownHandler);
};

const showPreview = (photo) => {
  renderedCommentNumber = 0;
  commentsList.innerHTML = '';
  document.body.classList.add('modal-open');
  preview.classList.remove('hidden');
  picture.querySelector('img').src = photo.url;
  picture.querySelector('img').alt = 'Если ты слепой, то ты не видешь';
  preview.querySelector('.likes-count').textContent = `${photo.likes}`;
  description.textContent = `${photo.description}`;
  commentsList.append(createCommentList(photo));
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
