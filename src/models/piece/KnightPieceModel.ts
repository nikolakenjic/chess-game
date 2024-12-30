import { PieceType } from '../../constants/piece-info';
import { checkValidMove } from '../../services/move-service';
import BoardModel from '../BoardModel';
import { CoordinateModel } from '../CoordinateModel';
import { PlayerColor } from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';

export default class KnightPieceModel extends PieceModel {
  constructor(color: PlayerColor) {
    super(PieceType.KNIGHT, color);
  }

  getValidMoves = (
    board: BoardModel,
    square: SquareModel
  ): Array<CoordinateModel | null> => {
    const validMoves: Array<CoordinateModel | null> = [];
    const { row, column } = square.coordinates;

    // Vertical
    validMoves.push(
      checkValidMove(board, square, { row: row + 2, column: column + 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row + 2, column: column - 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row - 2, column: column + 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row - 2, column: column - 1 }).move
    );

    // Horizontal
    validMoves.push(
      checkValidMove(board, square, { row: row + 1, column: column + 2 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row + 1, column: column - 2 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row - 1, column: column + 2 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row - 1, column: column - 2 }).move
    );

    return validMoves;
  };
}
