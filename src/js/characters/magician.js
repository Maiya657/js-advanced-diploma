import Character from "../Character";

export class Magician extends Character {
  constructor (level) {
    super(1, 'magician');
    this.attack = 10;
    this.defence = 40;
    this.moveRange = 1;
    this.attackRange = 4;

    for (let i = 1; i < level; i++) {
      this.levelUp();
    }
  }
}