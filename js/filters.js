import { shuffleArray, debounce } from './utils.js';
import { createGallery, deleteGallery } from './gallery.js';

export const filters = (postList) => {
  const containerElement = document.querySelector('.img-filters');
  const formElement = containerElement.querySelector('.img-filters__form');
  containerElement.classList.remove('img-filters--inactive');

  const FILTER_OPTIONS = {
    default: 'filter-default',
    random: 'filter-random',
    popular: 'filter-discussed'
  };

  const sortByPopularity = (a, b) => b.comments.length - a.comments.length;

  const activateFilter = (filterType) => {
    const listCopy = [...postList];
    let newList = [];

    switch (filterType) {
      case FILTER_OPTIONS.default:
        newList = listCopy;
        break;
      case FILTER_OPTIONS.random:
        newList = shuffleArray(listCopy).slice(0, 10);
        break;
      case FILTER_OPTIONS.popular:
        newList = listCopy.sort(sortByPopularity);
        break;
    }
    deleteGallery();
    createGallery(newList);
  };

  const formClickHandler = (e) => {
    const button = e.target.closest('button:not(.img-filters__button--active)');
    const activeButtonElement = formElement.querySelector('.img-filters__button--active');
    const buttonDebounce = debounce(activateFilter);

    if (button) {
      activeButtonElement.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
      buttonDebounce(button.id);
    }
  };

  formElement.addEventListener('click', formClickHandler);
};
