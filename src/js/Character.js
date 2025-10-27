/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    if (!new.target || new.target.name === 'Character') {
      throw Error('Class could be used as instance!')
    }
    
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    this.moveRange = 0;
    this.attackRange = 0;
  }

   get stat() {
    return `🎖${this.level} ⚔${this.attack} 🛡${this.defence} ❤${this.health}`;
  }

  levelUp() {
    const { health, level } = this;

    if (health > 0) {
      this.attack = Math.floor(Math.max(this.attack, this.attack * ((80 + health) / 100)));
      this.defence = Math.floor(Math.max(this.defence, this.defence * ((80 + health) / 100)));
      this.health = Math.floor(Math.min(health + 80, 100));
      this.level = Math.min(level + 1, 4);
    } else { 
      throw new Error('Character has been died!'); 
    }
  }
}
