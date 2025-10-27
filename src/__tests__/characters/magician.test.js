import { Magician } from "../../js/characters/magician";

test('check level', () => {
  const magician = new Magician(2);
  expect(magician.level).toBe(2);
});

test('check attack', () => {
  const magician = new Magician(1);
  expect(magician.attack).toBe(10);
});

test('check defence', () => {
  const magician = new Magician(1);
  expect(magician.defence).toBe(40);
});

test('check health', () => {
  const magician = new Magician(1);
  expect(magician.health).toBe(50);
});

test('check type', () => {
  const magician = new Magician(1);
  expect(magician.type).toBe('magician');
});

test('check move range', () => {
  const magician = new Magician(1);
  expect(magician.moveRange).toBe(1);
});

test('check move attack', () => {
  const magician = new Magician(1);
  expect(magician.attackRange).toBe(4);
});

test('check stat', () => {
  const magician = new Magician(1);
  expect(magician.stat).toBe('🎖1 ⚔10 🛡40 ❤50');
})