import Character from "../Character";

export class Vampire extends Character {
  constructor (level) {
    super(1, 'vampire');
    this.attack = 25;
    this.defence = 25;
    this.moveRange = 2;
    this.attackRange = 2;

    for (let i = 1; i < level; i++) {
      this.levelUp();
    }
  }
}