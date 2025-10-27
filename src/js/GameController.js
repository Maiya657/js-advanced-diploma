import { Bowman } from "./characters/bowman";
import { Daemon } from "./characters/daemon";
import { Magician } from "./characters/magician";
import { Swordsman } from "./characters/swordsman";
import { Undead } from "./characters/undead";
import { Vampire } from "./characters/vampire";
import PositionedCharacter from "./PositionedCharacter";
import { generateTeam, randomInteger } from "./generators";
import GamePlay from "./GamePlay";
import cursors from "./cursors";
import GameState from "./GameState";

const maxStartLevel = 2;
const characterCount = 3;
const playersCharacterList = ['bowman', 'swordsman', 'magician'];

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.positionedCharacters = [];
    this.selectedCharacter;
  }

  init(loadFromStorage = true, showAlert = false) {
    let data;

    if(loadFromStorage) {
      data = this.stateService.load();
      if(!data && showAlert) {
        GamePlay.showMessage('Save not found.');
      }
    } 

    if(!data) {
      const playerPositionedTeam = this.createPositionedTeam([Bowman, Swordsman, Magician], [0, 1]);
      const enemyPositionedTeam = this.createPositionedTeam([Vampire, Daemon, Undead], [this.gamePlay.boardSize - 1, this.gamePlay.boardSize - 2]);

      data = {playerPositionedTeam, enemyPositionedTeam};
    }

    this.gameState = GameState.from(data);

    this.positionedCharacters = [...this.gameState.playerPositionedTeam, ...this.gameState.enemyPositionedTeam];

    this.gamePlay.drawUi(this.gameState.theme);
    this.redrawUi();
   
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGame.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGame.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGame.bind(this)); 
  }

  createPositionedTeam(allowedTypes, allowedColomnIndexes, maxLevel = maxStartLevel) {
    const playerTeam = generateTeam(allowedTypes, maxLevel, characterCount);
    const playerTeamPositions = this.getCharacterPositions(allowedColomnIndexes, characterCount);
    const playerPositionedTeam = [];
    playerTeam.characters.forEach((character, index) => {
      playerPositionedTeam.push(new PositionedCharacter(character, playerTeamPositions[index]));
    });
    return playerPositionedTeam;
  }

  onNewGame() {
    this.init(false);
  }

  onSaveGame() {
    this.stateService.save(this.gameState);
    GamePlay.showMessage('Game saved.');
  }

  onLoadGame() {
    this.init(true);
  }

  onCellClick(index) {
    if(this.gameState.gameOver) {
      return;
    }

    const positionedCharacter = this.findPositionedCharacterByPosition(index);
    const selectedCharacter = this.findPositionedCharacterByPosition(this.selectedCharacter);

    switch(true) {
      case(this.gameState.isPlayer && positionedCharacter && positionedCharacter.character 
        && this.isPlayerPositionedCharacter(positionedCharacter)): {
        this.gamePlay.selectCell(index);
        this.selectedCharacter = index;
        break;
      }

      case(this.gameState.isPlayer && selectedCharacter && selectedCharacter.character 
        && !positionedCharacter && selectedCharacter.canMove(index, this.gamePlay.boardSize)): {
          this.characterMove(index, selectedCharacter);
          this.computerStep();
          break;
        }

      case(this.gameState.isPlayer && selectedCharacter && selectedCharacter.character
        && positionedCharacter && positionedCharacter.character
        && !this.isPlayerPositionedCharacter(positionedCharacter) && selectedCharacter.canAttack(index, this.gamePlay.boardSize)): {
          this.characterAttack(selectedCharacter, positionedCharacter).then(() => {
            this.computerStep();
          });
          break;
        }

      default: {
        GamePlay.showError('Wrong action!');
        break;
      }
    }
  }

  onCellEnter(index) {
     if(this.gameState.gameOver) {
      return;
    }

    const positionedCharacter = this.findPositionedCharacterByPosition(index);
    const selectedCharacter = this.findPositionedCharacterByPosition(this.selectedCharacter);

    if(positionedCharacter && positionedCharacter.character) {
      this.gamePlay.showCellTooltip(positionedCharacter.character.stat, index);
    }

    if(selectedCharacter && selectedCharacter.character) {
      this.gamePlay.deselectCell(selectedCharacter.position);
    }

    switch(true) {
      case(this.gameState.isPlayer && this.isPlayerPositionedCharacter(positionedCharacter)): {
        this.gamePlay.setCursor(cursors.pointer);
        break;
      }

      case(this.gameState.isPlayer && selectedCharacter && selectedCharacter.character 
        && !positionedCharacter && selectedCharacter.canMove(index, this.gamePlay.boardSize)): {
        this.gamePlay.selectCell(index, 'green'); 
        this.gamePlay.setCursor(cursors.pointer);
        break;
      }

      case(this.gameState.isPlayer && selectedCharacter && selectedCharacter.character
        && positionedCharacter && positionedCharacter.character
        && !this.isPlayerPositionedCharacter(positionedCharacter) && selectedCharacter.canAttack(index, this.gamePlay.boardSize)): {
        this.gamePlay.selectCell(index, 'red'); 
        this.gamePlay.setCursor(cursors.crosshair);
        break;
      }

      default: {
        this.gamePlay.setCursor(cursors.notallowed);
        break;
      }
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    if(index !== this.selectedCharacter && this.gameState.isPlayer) {
      this.gamePlay.deselectCell(index);
    }
  }

  async characterAttack(attacker, target) {
    const damage = Math.max(attacker.character.attack - target.character.defence, attacker.character.attack * 0.1);
    
    target.character.health -= damage;
    if(target.character.health <= 0) {
      if (this.isPlayerPositionedCharacter(target)) {
        this.gameState.playerPositionedTeam.splice(this.gameState.playerPositionedTeam.indexOf(target), 1);
      } else {
        this.gameState.enemyPositionedTeam.splice(this.gameState.enemyPositionedTeam.indexOf(target), 1);
      }
      this.positionedCharacters = [...this.gameState.playerPositionedTeam, ...this.gameState.enemyPositionedTeam];

      if (this.gameState.enemyPositionedTeam.length === 0) {
        this.gamePlay.deselectCell(attacker.position);
        this.gamePlay.deselectCell(target.position);
        this.gamePlay.setCursor(cursors.auto);

        this.selectedCharacter = undefined;

        this.levelUp();

        return;
      }

      if (this.gameState.playerPositionedTeam.length === 0) {
        this.gameOver();
        return;
      }
    }
    this.resetStepPosition(target.position, attacker.position);

    await this.gamePlay.showDamage(target.position, damage);
  }

  characterMove(index, selectedCharacter) {
    selectedCharacter.position = index;
    this.resetStepPosition(index, this.selectedCharacter);
  }

  redrawUi() {
    this.gamePlay.redrawPositions(this.positionedCharacters);
  }

  resetStepPosition(targetPosition, fromPosition) {
    this.redrawUi();
    this.gameState.toggleCurrentStepTeam();
    if(targetPosition) {
      this.gamePlay.deselectCell(targetPosition);
    }
    if(fromPosition) {
      this.gamePlay.deselectCell(fromPosition);
    }
    
    this.selectedCharacter = undefined;
  }

  getCharacterPositions(allowedColomnIndexes, characterCount) {
    this.gamePlay.boardSize;
    const positions = [];
    
    for (let i = 0; i < this.gamePlay.boardSize * this.gamePlay.boardSize; i++) {
      if (allowedColomnIndexes.includes(i % this.gamePlay.boardSize)) {
        positions.push(i);
      }
    }

    const characterPositions = [];
    
    while (characterPositions.length < characterCount) {
      const randomIndex = randomInteger(0, positions.length - 1);

      if (!characterPositions.includes(positions[randomIndex])) {
        characterPositions.push(positions[randomIndex]);
      }
    }

    return characterPositions;
  }

  findPositionedCharacterByPosition(position) {
    return this.positionedCharacters.find(positionedCharacter => positionedCharacter.position === position);
  }

  isPlayerPositionedCharacter(positionedCharacter) {
    return positionedCharacter && positionedCharacter.character && playersCharacterList.includes(positionedCharacter.character.type);
  }

  computerStep() {
    const isAttacked = this.tryComputerAttack();
    if(!isAttacked) {
      this.computerMovement();
    }
  }

  tryComputerAttack() {
    for (let i = 0; i < this.gameState.enemyPositionedTeam.length; i++) {
      for (let j = 0; j < this.gameState.playerPositionedTeam.length; j++) {
        const enemy = this.gameState.enemyPositionedTeam[i];
        const player = this.gameState.playerPositionedTeam[j];

        if(enemy.canAttack(player.position, this.gamePlay.boardSize)) {
          this.gamePlay.selectCell(enemy.position);
          this.gamePlay.selectCell(player.position, 'red');
          this.selectedCharacter = enemy.position;

          setTimeout((() => {
            this.characterAttack(enemy, player);
          }).bind(this), 1000);

          return true;
        }        
      }
    }
    return false;
  }
  
  computerMovement() {
    const randomEnemy = this.gameState.enemyPositionedTeam[randomInteger(0, this.gameState.enemyPositionedTeam.length - 1)];
    console.log('enemy',this.gameState.enemyPositionedTeam );
    
    const moveableCells = randomEnemy.generateMoveableCells(this.positionedCharacters, this.gamePlay.boardSize);
    const randomEnemyCell = moveableCells[randomInteger(0, moveableCells.length - 1)];

    this.gamePlay.selectCell(randomEnemy.position);
    this.gamePlay.selectCell(randomEnemyCell, 'green');
    this.selectedCharacter = randomEnemy.position;

    setTimeout((() => {
      this.characterMove(randomEnemyCell, randomEnemy);
    }).bind(this), 1000);
  }

  levelUp() {
    this.gameState.level += 1;
    
    if(this.gameState.level > 4) {
      this.gameOver();
    }

    this.gameState.playerPositionedTeam.forEach(player => {
      player.character.levelUp();
    })

    this.gameState.enemyPositionedTeam = this.createPositionedTeam([Vampire, Daemon, Undead], [this.gamePlay.boardSize - 1, this.gamePlay.boardSize - 2], this.gameState.level);

    this.positionedCharacters = [...this.gameState.playerPositionedTeam, ...this.gameState.enemyPositionedTeam];

    this.gamePlay.drawUi(this.gameState.theme);
    this.gamePlay.redrawPositions(this.positionedCharacters);
    this.gamePlay.setCursor(cursors.auto);
    this.gameState.toggleCurrentStepTeam();
  }

  gameOver() {
    this.gameState.gameOver = true;
    this.gamePlay.setCursor(cursors.notallowed);

    GamePlay.showMessage(this.gameState.positionedEnemyTeam.length === 0 ? 'You win!' : 'GameOver!');
  }
}
