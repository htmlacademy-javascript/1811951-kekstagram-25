const photo = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const level = document.querySelector('.img-upload__effect-level');
let currentEffect;
level.classList.add('hidden');

const setFilterValue = (value) => {
  let filterValue;
  let inputValue;
  switch (currentEffect) {
    case 'chrome':
      inputValue = value / 100;
      filterValue = `grayscale(${inputValue})`;
      break;
    case 'sepia':
      inputValue = value / 100;
      filterValue = `sepia(${inputValue})`;
      break;
    case 'marvin':
      inputValue = Math.floor((value * 100) / 100);
      filterValue = `invert(${inputValue}%)`;
      break;
    case 'phobos':
      inputValue = (value * 3) / 100;
      filterValue = `blur(${inputValue}px)`;
      break;
    case 'heat':
      inputValue = (value * 3) / 100;
      filterValue = `brightness(${inputValue})`;
      break;
    case 'none':
      filterValue = 'none';
  }
  photo.style.filter = filterValue;
  effectLevelValue.setAttribute('value', inputValue);
};

effectsList.addEventListener('change', (e) => {
  const effectName = e.target.value;
  photo.classList.remove(`effects__preview--${currentEffect}`);
  photo.classList.add(`effects__preview--${effectName}`);
  currentEffect = effectName;

  if (currentEffect === 'none') {
    level.classList.add('hidden');
  } else if (level.classList.contains('hidden')) {
    level.classList.remove('hidden');
  }
  level.noUiSlider.reset();
});

noUiSlider.create(level, {
  connect: 'lower',
  start: 0,
  step: 1,
  range: {
    min: 0,
    max: 100
  }
});

level.noUiSlider.on('update', () => {
  setFilterValue(level.noUiSlider.get());
});
