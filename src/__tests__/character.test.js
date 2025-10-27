import Character from "../js/Character";

test('check create character error', () => {
  expect(() => { new Character(2); }).toThrow(Error);
});