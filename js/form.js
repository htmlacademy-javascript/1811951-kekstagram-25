import {
  KEYS
} from './utils.js';
import {
  effects
} from './effects.js';
import {
  scale
} from './scale.js';

const HASHTAGS_CONFIG = {
  len: 20,
  amount: 5,
  firstChar: '#'
};
const form = document.querySelector('.img-upload__form');
const imageUpload = form.querySelector('#upload-file');
const imageEditor = form.querySelector('.img-upload__overlay');
const buttonClose = imageEditor.querySelector('#upload-cancel');
const postHashtags = imageEditor.querySelector('.text__hashtags');
const postDescription = imageEditor.querySelector('.text__description');
const submit = imageEditor.querySelector('#upload-submit');
const photo = document.querySelector('.img-upload__preview img');
const level = document.querySelector('.img-upload__effect-level');

const formReset = () => {
  form.reset();
  level.classList.add('hidden');
  level.noUiSlider.reset();
  postHashtags.style = 'outlineColor: webkit-focus-ring-color';
  postDescription.style = 'outlineColor: webkit-focus-ring-color';
};

const imageUploadClickHandler = () => {
  document.body.classList.add('modal-open');
  imageEditor.classList.remove('hidden');
  scale(photo);
};

const closeImageUpload = () => {
  document.body.classList.remove('modal-open');
  imageEditor.classList.add('hidden');
  formReset();
};

const buttonCloseClickHandler = () => {
  closeImageUpload();
};

const imageUploadKeydownHandler = (e) => {
  if (e.keyCode === KEYS.esc) {
    closeImageUpload();
  }
};

const validatePostHashtags = () => {
  const hashtags = postHashtags.value.trim().toLowerCase().split(' ');
  let errorMessage = '';
  if (hashtags.length > HASHTAGS_CONFIG.amount) {
    errorMessage = 'Капец ты разошелся. 5 хэштегов и не больше!';
  } else if (hashtags.length <= 1) {
    errorMessage = 'Напиши хоть что-нибудь';
  } else if (postHashtags.value !== '') {
    for (const i in hashtags) {
      if (hashtags[i].charAt(0) !== HASHTAGS_CONFIG.firstChar) {
        errorMessage = 'Хэштеги начинаются с #, дебил';
      } else if (hashtags[i].indexOf('#', 1) > 0) {
        errorMessage = 'Раздели пожалуйста хэштеги пробелом';
      } else if (hashtags[i].length > HASHTAGS_CONFIG.len) {
        errorMessage = 'Слишком длинный у тебя, мой друг';
      } else if (
        hashtags.indexOf(hashtags[i]) !== hashtags.lastIndexOf(hashtags[i])
      ) {
        errorMessage =
          'От того, что ты дублируешь хэштеги, просмотров не прибавится';
      } else if (hashtags[i].charAt(1) === '') {
        errorMessage = 'Пустые хэштеги для лохов';
      }
      if (errorMessage) {
        break;
      }
    }
  }
  postHashtags.setCustomValidity(errorMessage);
  postHashtags.reportValidity();
};

const checkFormValidity = (input) => {
  input.style.outlineColor = input.validity.valid ?
    'webkit-focus-ring-color' :
    'red';
};

const validatePostDescription = () => {
  const description = postDescription.value;
  let errorMessage = '';

  if (description.length < 50) {
    errorMessage = 'Описание или я вычислю тебя по ip';
  } else if (description.length > 140) {
    errorMessage = 'Ну ты Пушкин, просто обалдеть!';
  }

  postDescription.setCustomValidity(errorMessage);
  postDescription.reportValidity();
};

const formValiditySubmitHandler = () => {
  validatePostHashtags();
  validatePostDescription();
  checkFormValidity(postHashtags);
  checkFormValidity(postDescription);
};

effects(level, photo);
postDescription.addEventListener('change', validatePostDescription);
submit.addEventListener('click', formValiditySubmitHandler);
postHashtags.addEventListener('change', validatePostHashtags);
imageUpload.addEventListener('change', imageUploadClickHandler);
buttonClose.addEventListener('click', buttonCloseClickHandler);
document.addEventListener('keydown', imageUploadKeydownHandler);
