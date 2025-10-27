import { Vampire } from "../../js/characters/vampire";


test('check level', () => {
  const vampire = new Vampire(3);
  expect(vampire.level).toBe(3);
});

test('check attack', () => {
  const vampire = new Vampire(1);
  expect(vampire.attack).toBe(25);
});

test('check defence', () => {
  const vampire = new Vampire(1);
  expect(vampire.defence).toBe(25);
});

test('check health', () => {
  const vampire = new Vampire(1);
  expect(vampire.health).toBe(50);
});

test('check type', () => {
  const vampire = new Vampire(1);
  expect(vampire.type).toBe('vampire');
});

test('check move range', () => {
  const vampire = new Vampire(1);
  expect(vampire.moveRange).toBe(2);
});

test('check move attack', () => {
  const vampire = new Vampire(1);
  expect(vampire.attackRange).toBe(2);
});