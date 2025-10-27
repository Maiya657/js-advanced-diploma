import { Bowman } from "../../js/characters/bowman";

test('check level', () => {
  const bowman = new Bowman(3);
  expect(bowman.level).toBe(3);
});

test('check attack', () => {
  const bowman = new Bowman(1);
  expect(bowman.attack).toBe(25);
});

test('check defence', () => {
  const bowman = new Bowman(1);
  expect(bowman.defence).toBe(25);
});

test('check health', () => {
  const bowman = new Bowman(1);
  expect(bowman.health).toBe(50);
});

test('check type', () => {
  const bowman = new Bowman(1);
  expect(bowman.type).toBe('bowman');
});

test('check move range', () => {
  const bowman = new Bowman(1);
  expect(bowman.moveRange).toBe(2);
});

test('check move attack', () => {
  const bowman = new Bowman(1);
  expect(bowman.attackRange).toBe(2);
});