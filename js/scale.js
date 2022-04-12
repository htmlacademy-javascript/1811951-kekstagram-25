const PHOTO_SIZES = {
  initial: 100,
  min: 25,
  max: 100,
  step: 25
};

const controllerElement = document.querySelector('.scale__control--value');
const buttonSmallerElement = document.querySelector('.scale__control--smaller');
const buttonBiggerElement = document.querySelector('.scale__control--bigger');

const scaleReset = (photo) => {
  controllerElement.setAttribute('value', `${PHOTO_SIZES.initial}%`);
  photo.style.transform = `scale(${PHOTO_SIZES.initial / 100})`;
};

const scaleSet = (photo) => {
  scaleReset(photo);
  const getResizedPhoto = (direction) => {
    const currentValue = parseInt(controllerElement.value, 10);
    const nextValue = currentValue + PHOTO_SIZES.step * direction;

    if (nextValue >= PHOTO_SIZES.min && nextValue <= PHOTO_SIZES.max) {
      controllerElement.setAttribute('value', `${nextValue}`);
      photo.style.transform = `scale(${nextValue / 100})`;
    }
  };

  buttonSmallerElement.addEventListener('click', () => getResizedPhoto(-1));
  buttonBiggerElement.addEventListener('click', () => getResizedPhoto(1));
};

export { scaleSet, scaleReset };
