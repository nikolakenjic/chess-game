import { CoordinateModel } from '../models/CoordinateModel';
import { PieceType } from '../models/PieceModel';
import { PlayerColor } from '../models/PlayerModel';
import SquareModel from '../models/SquareModel';

export const getValidMoves = (
  square: SquareModel | null
): Array<CoordinateModel> => {
  if (!square || !square?.piece) return [];

  const validMoves: Array<CoordinateModel> = [];
  const { row, column } = square.coordinates;

  if (square.piece.type === PieceType.PAWN) {
    if (square.piece.color === PlayerColor.WHITE) {
      validMoves.push({ row: row + 1, column });
      if (row === 1) {
        validMoves.push({ row: row + 2, column });
      }
    } else {
      validMoves.push({ row: row - 1, column });
      if (row === 6) {
        validMoves.push({ row: row - 2, column });
      }
    }
  }

  return validMoves;

  //    return board.squares
  //         .filter(
  //           (boardSquare) =>
  //             boardSquare.coordinates.column !==
  //               selectedSquare?.coordinates.column ||
  //             boardSquare.coordinates.row !== selectedSquare?.coordinates.row
  //         )
  //         .map((boardSquare) => boardSquare.coordinates);
};
