import { Daemon } from "../../js/characters/daemon";

test('check level', () => {
  const daemon = new Daemon(3);
  expect(daemon.level).toBe(3);
});

test('check attack', () => {
  const daemon = new Daemon(1);
  expect(daemon.attack).toBe(10);
});

test('check defence', () => {
  const daemon = new Daemon(1);
  expect(daemon.defence).toBe(10);
});

test('check health', () => {
  const daemon = new Daemon(1);
  expect(daemon.health).toBe(50);
});

test('check type', () => {
  const daemon = new Daemon(1);
  expect(daemon.type).toBe('daemon');
});

test('check move range', () => {
  const daemon = new Daemon(1);
  expect(daemon.moveRange).toBe(1);
});

test('check move attack', () => {
  const daemon = new Daemon(1);
  expect(daemon.attackRange).toBe(4);
});