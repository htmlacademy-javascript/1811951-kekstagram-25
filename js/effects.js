export const effects = (level, photo) => {
  const DIVIDER = 100;
  const effectsList = document.querySelector('.effects__list');
  const effectLevelValue = document.querySelector('.effect-level__value');
  let currentEffect;
  level.classList.add('hidden');

  const setFilterValue = (value) => {
    let filterValue;
    let inputValue;
    switch (currentEffect) {
      case 'chrome':
        inputValue = value / DIVIDER;
        filterValue = `grayscale(${inputValue})`;
        break;
      case 'sepia':
        inputValue = value / DIVIDER;
        filterValue = `sepia(${inputValue})`;
        break;
      case 'marvin':
        inputValue = Math.floor((value * 100) / DIVIDER);
        filterValue = `invert(${inputValue}%)`;
        break;
      case 'phobos':
        inputValue = (value * 3) / DIVIDER;
        filterValue = `blur(${inputValue}px)`;
        break;
      case 'heat':
        inputValue = (value * 3) / DIVIDER;
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
};
