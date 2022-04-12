import {
  KEYS
} from './utils.js';
import {
  effects
} from './effects.js';
import { scaleSet, scaleReset } from './scale.js';
import {
  getMessage
} from './message.js';
import {
  serverSave
} from './backend.js';
import { imageLoader } from './imageLoader.js';

const HASHTAGS_CONFIG = {
  len: 20,
  amount: 5,
  firstChar: '#'
};
const formElement = document.querySelector('.img-upload__form');
const imageUploadElement = formElement.querySelector('#upload-file');
const imageEditorElement = formElement.querySelector('.img-upload__overlay');
const buttonCloseElement = imageEditorElement.querySelector('#upload-cancel');
const postHashtagsElement = imageEditorElement.querySelector('.text__hashtags');
const postDescriptionElement = imageEditorElement.querySelector('.text__description');
const submitElement = imageEditorElement.querySelector('#upload-submit');
const photoElement = document.querySelector('.img-upload__preview img');
const levelElement = document.querySelector('.img-upload__effect-level');

const formReset = () => {
  formElement.reset();
  levelElement.noUiSlider.reset();
  postHashtagsElement.style = 'outlineColor: webkit-focus-ring-color';
  postDescriptionElement.style = 'outlineColor: webkit-focus-ring-color';
  photoElement.src = 'img/upload-default-image.jpg';
  photoElement.style = '';
  photoElement.className = '';
  levelElement.classList.add('hidden');
  scaleReset(photoElement);
};

const imageUploadClickHandler = () => {
  document.body.classList.add('modal-open');
  imageEditorElement.classList.remove('hidden');
  imageLoader(imageUploadElement, photoElement);
};

const closeImageUpload = () => {
  document.body.classList.remove('modal-open');
  imageEditorElement.classList.add('hidden');
  formReset();
};

const buttonCloseClickHandler = () => {
  closeImageUpload();
};

const imageUploadKeydownHandler = (e) => {
  if (
    e.keyCode === KEYS.esc &&
    document.activeElement !== postDescriptionElement &&
    document.activeElement !== postHashtagsElement
  ) {
    closeImageUpload();
  }
};

const validatePostHashtags = () => {
  const hashtags = postHashtagsElement.value.trim().toLowerCase().split(' ');
  let errorMessage = '';
  if (hashtags.length > HASHTAGS_CONFIG.amount) {
    errorMessage = 'Капец ты разошелся. 5 хэштегов и не больше!';
  } else if (postHashtagsElement.value !== '') {
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
  postHashtagsElement.setCustomValidity(errorMessage);
  return postHashtagsElement.reportValidity();
};

const checkFormValidity = (input) => {
  input.style.outlineColor = input.validity.valid ?
    'webkit-focus-ring-color' :
    'red';
};

const validatePostDescription = () => {
  const description = postDescriptionElement.value;
  let errorMessage = '';

  if (description.length > 140) {
    errorMessage = 'Ну ты Пушкин, просто обалдеть!';
  }

  postDescriptionElement.setCustomValidity(errorMessage);
  return postDescriptionElement.reportValidity();
};

const validator = () => {
  validatePostHashtags();
  validatePostDescription();
  checkFormValidity(postHashtagsElement);
  checkFormValidity(postDescriptionElement);
};

const formSaveAction = (type) => {
  submitElement.disabled = false;
  closeImageUpload();
  getMessage(`${type}`);
};

const formSubmitHandler = (e) => {
  e.preventDefault();
  validator();

  if (validatePostDescription() && validatePostHashtags()) {
    submitElement.disabled = true;
    const data = new FormData(formElement);
    serverSave(
      data,
      () => formSaveAction('success'),
      () => formSaveAction('error')
    );
  }
};

effects(levelElement, photoElement);
scaleSet(photoElement);
postDescriptionElement.addEventListener('change', validatePostDescription);
formElement.addEventListener('submit', formSubmitHandler);
postHashtagsElement.addEventListener('change', validatePostHashtags);
imageUploadElement.addEventListener('change', imageUploadClickHandler);
buttonCloseElement.addEventListener('click', buttonCloseClickHandler);
document.addEventListener('keydown', imageUploadKeydownHandler);
