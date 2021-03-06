import { Interactor, directions } from 'potato-engine';
import { Map } from 'immutable';

const { randomDirection, manhattan, towards } = directions;

export default class Monster extends Interactor {
  get frequency() {
    return 3;
  }

  get opportunistic() {
    return true;
  }

  get content() {
    return this.symbol;
  }

  think() {
    const { random, board, entities } = this;
    const nearestPlayer = this.findNearestPlayer();

    this.nibblePlayer(); // A player may have moved into our orbit. Eat part of it!
    //this.eatAdjacentPlayers(); // A player may have moved into our orbit. Kill it!
    if (random.nextBoolean() && nearestPlayer) {
      const direction = towards(this.coords, nearestPlayer.coords, random);

      if (!(board.at(this.coords, direction) instanceof entities.BlackHole)) {
        this.move(direction);
      }
    } else {
      this.move(randomDirection(random));
    }
    //this.eatAdjacentPlayers(); // We may have moved within striking range of a player. Nom.
  }

  findNearestPlayer() {
    let nearestPlayer = null;
    let nearestPlayerDist = Infinity;
    for (const player of this.board.players()) {
      const dist = manhattan(this.coords, player.coords);
      if (dist < nearestPlayerDist) {
        nearestPlayerDist = dist;
        nearestPlayer = player;
      }
    }
    return nearestPlayer;
  }

  nibblePlayer() {
    let adjacentPlayer;
    while ((adjacentPlayer = this.findAdjacentPlayer() && adjacentPlayer.state.health > 0)) {
      adjacentPlayer.state.health -= 1;
    }
    if (adjacentPlayer != null && adjacentPlayer.state.health <= 0) {
      this.eat(adjacentPlayer);
    }
  }

  eatAdjacentPlayers() {
    let adjacentPlayer;
    while ((adjacentPlayer = this.findAdjacentPlayer())) {
      this.eat(adjacentPlayer);
    }
  }

  findAdjacentPlayer() {
    const { board, entities } = this;
    return directions.directions.reduceRight((adjacentPlayer, direction) => {
      const target = board.at(this.coords, direction);
      return target instanceof entities.Player ? target : adjacentPlayer;
    }, null);
  }

  get type() {
    return this.attribute;
  }
}
Monster.attributesBySymbol = Map({
  E: 'GNASHER',
  T: 'TWISTER',
  '[': 'SPIKE',
  '~': 'SNAKE',
  C: 'BLOB',
});
Monster.__name = 'Monster'; // uglify killin' me
