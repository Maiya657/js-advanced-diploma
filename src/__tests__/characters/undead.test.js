import { Undead } from "../../js/characters/undead";



test('check level', () => {
  const undead = new Undead(3);
  expect(undead.level).toBe(3);
});

test('check attack', () => {
  const undead = new Undead(1);
  expect(undead.attack).toBe(40);
});

test('check defence', () => {
  const undead = new Undead(1);
  expect(undead.defence).toBe(10);
});

test('check health', () => {
  const undead = new Undead(1);
  expect(undead.health).toBe(50);
});

test('check type', () => {
  const undead = new Undead(1);
  expect(undead.type).toBe('undead');
});

test('check move range', () => {
  const undead = new Undead(1);
  expect(undead.moveRange).toBe(4);
});

test('check move attack', () => {
  const undead = new Undead(1);
  expect(undead.attackRange).toBe(1);
});