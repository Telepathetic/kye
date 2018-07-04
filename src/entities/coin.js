import Edible from './edible';
import { Map } from 'immutable';

export default class Coin extends Edible {
  get twinkles() {
    return true;
  }

  destroy() {
    const { board } = this;
    board.once('tick', () => {
      board.emit('progress', this);
      if (board.getState().diamondsLeft === 0) {
        board.emit('win');
      }
    });
    super.destroy();
  }
}
Coin.attributesBySymbol = Map({ o: null });
Coin.__name = 'Coin'; // uglify killin' me
