import { CoordinateModel } from './CoordinateModel';
import { PieceType } from '../constants/piece-info';
import { PlayerColor } from './PlayerModel';

export default interface MoveModel {
  from: CoordinateModel;
  to: CoordinateModel;
  piece: PieceType;
  color: PlayerColor;
  captured?: PieceType
}
