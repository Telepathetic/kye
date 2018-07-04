import { Player as BasePlayer } from 'potato-engine';
import { Record, Map } from 'immutable';

export default class Player extends BasePlayer {
  //const stuff = {};

  //constructor(props) {
  //super(props);
  /*
    this.stuff.state = Record({
      constitution: 0,
      health: 0,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      purse: 0,
      color: 0,
    });
    */
  //}

  get health() {
    return this.stuff.state.health;
  }

  get purse() {
    return this.stuff.state.purse;
  }

  get electroMagnet() {
    return true;
  }
}
Player.attributesBySymbol = Map({ K: null });
Player.__name = 'Player'; // uglify killin' me
