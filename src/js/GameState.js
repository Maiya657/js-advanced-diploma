import themes from "./themes";

export default class GameState {
  constructor(currentStepTeam = 'player', level = 1, gameOver = false, enemyPositionedTeam, playerPositionedTeam) {
    this.currentStepTeam = currentStepTeam;
    this.level = level;
    this.gameOver = gameOver;
    this.enemyPositionedTeam = enemyPositionedTeam;
    this.playerPositionedTeam = playerPositionedTeam;
  }

  static from(object) {
    return new GameState(object.currentStepTeam, object.level, object.gameOver, object.enemyPositionedTeam, object.playerPositionedTeam);
  }

  toggleCurrentStepTeam() {
    if (this.currentStepTeam === 'player') {
      this.currentStepTeam = 'enemy';
    } else {
      this.currentStepTeam = 'player';
    }
  }

  get isPlayer() {
    return this.currentStepTeam === 'player';
  }

  get theme() {
    switch (this.level) {
      case 1: {
        return themes.prairie;
      }
      case 2: {
        return themes.desert;
      }
      case 3: {
        return themes.arctic;
      }
      case 4: {
        return themes.mountain;
      }
      default: {
        throw new Error('Unknown level');
      }
    }
  }
}
