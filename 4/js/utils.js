//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandInt = (min, max) => {
  if (min < 0 || max < 0) {
    return 'Рип. Оба числа должны быть больше нуля';
  }
  return Math.floor(min + Math.random() * (max - min + 1));
};

//Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна.
const getStrLen = (str, maxLen) => str.length <= maxLen;

export { getRandInt, getStrLen };