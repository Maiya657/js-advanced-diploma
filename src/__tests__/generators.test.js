import { Bowman } from "../js/characters/bowman";
import { Magician } from "../js/characters/magician";
import { Swordsman } from "../js/characters/swordsman";
import { characterGenerator, generateTeam } from "../js/generators";

test('check character generator level', () => {
  const { level } = characterGenerator([Bowman, Magician, Swordsman], 2).next().value;
  expect(level).toBeLessThanOrEqual(2)
  expect(level).toBeGreaterThan(0)
});

test('check character generator type', () => {
  const { type } = characterGenerator([Bowman, Magician, Swordsman], 2).next().value;
  expect(['bowman', 'magician', 'swordsman'].findIndex(value => value === type)).toBeGreaterThanOrEqual(0);
});

test('check team generate', () => {
  const team = generateTeam([Bowman, Magician, Swordsman], 2, 4);
  expect(team.characters.length).toBe(4);
});