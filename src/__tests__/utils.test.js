import { calcTileType } from "../js/utils";

test('check top-left', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
});

test('check bottom-right', () => {
  expect(calcTileType(63, 8)).toBe('bottom-right');
});

test('check top-right', () => {
  expect(calcTileType(7, 8)).toBe('top-right');
});

test('check bottom-left', () => {
  expect(calcTileType(56, 8)).toBe('bottom-left');
});

test('check top', () => {
  expect(calcTileType(1, 8)).toBe('top');
});

test('check bottom', () => {
  expect(calcTileType(57, 8)).toBe('bottom');
});

test('check left', () => {
  expect(calcTileType(16, 8)).toBe('left');
});

test('check right', () => {
  expect(calcTileType(15, 8)).toBe('right');
});

test('check center', () => {
  expect(calcTileType(19, 8)).toBe('center');
});