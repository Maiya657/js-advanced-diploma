import Team from "./Team";

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  while (true) {
    // найти индекс персонажа от 0 до allowedTypes.length-1
    const characterIndex = randomInteger(0, allowedTypes.length-1);
    // рандомное значение от 1 до maxLevel
    const level = randomInteger(1, maxLevel);
    yield new allowedTypes[characterIndex](level);
  }
}

export function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const playerGenerator = characterGenerator(allowedTypes, maxLevel);
  const teamArray = [];
  
  for (let i = 0; i < characterCount; i++) {
    teamArray.push(playerGenerator.next().value);
  }

  return new Team(teamArray);
}
