const templateElement = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createPicture = (postInfo) => {
  const el = templateElement.cloneNode(true);
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

export {
  createPicture,
  renderPicture
};
