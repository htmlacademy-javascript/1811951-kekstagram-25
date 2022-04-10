import { shuffleArray, debounce } from './utils.js';
import { createGallery, deleteGallery } from './gallery.js';

export const filters = (postList) => {
  const container = document.querySelector('.img-filters');
  const form = container.querySelector('.img-filters__form');
  container.classList.remove('img-filters--inactive');

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
    const activeButton = form.querySelector('.img-filters__button--active');
    const buttonDebounce = debounce(activateFilter);

    if (button) {
      activeButton.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
      buttonDebounce(button.id);
    }
  };

  form.addEventListener('click', formClickHandler);
};
