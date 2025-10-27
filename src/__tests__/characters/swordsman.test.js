import { Swordsman } from "../../js/characters/swordsman";


test('check level', () => {
  const swordsman = new Swordsman(2);
  expect(swordsman.level).toBe(2);
});

test('check attack', () => {
  const swordsman = new Swordsman(1);
  expect(swordsman.attack).toBe(40);
});

test('check defence', () => {
  const swordsman = new Swordsman(1);
  expect(swordsman.defence).toBe(10);
});

test('check health', () => {
  const swordsman = new Swordsman(1);
  expect(swordsman.health).toBe(50);
});

test('check type', () => {
  const swordsman = new Swordsman(1);
  expect(swordsman.type).toBe('swordsman');
});

test('check move range', () => {
  const swordsman = new Swordsman(1);
  expect(swordsman.moveRange).toBe(4);
});

test('check move attack', () => {
  const swordsman = new Swordsman(1);
  expect(swordsman.attackRange).toBe(1);
});