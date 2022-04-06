export const scale = (photo) => {
  const PHOTO_SIZES = {
    initial: 100,
    min: 25,
    max: 100,
    step: 25
  };

  const controller = document.querySelector('.scale__control--value');
  const buttonSmaller = document.querySelector('.scale__control--smaller');
  const buttonBigger = document.querySelector('.scale__control--bigger');

  controller.setAttribute('value', `${PHOTO_SIZES.initial}%`);
  photo.style.transform = `scale(${PHOTO_SIZES.initial / 100})`;

  const getResizedPhoto = (direction) => {
    const currentValue = parseInt(controller.value, 10);
    const nextValue = currentValue + PHOTO_SIZES.step * direction;

    if (nextValue >= PHOTO_SIZES.min && nextValue <= PHOTO_SIZES.max) {
      controller.setAttribute('value', `${nextValue}`);
      photo.style.transform = `scale(${nextValue / 100})`;
    }
  };

  buttonSmaller.addEventListener('click', () => getResizedPhoto(-1));
  buttonBigger.addEventListener('click', () => getResizedPhoto(1));
};
