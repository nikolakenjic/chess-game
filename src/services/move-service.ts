import BoardModel from '../models/BoardModel';
import { CoordinateModel } from '../models/CoordinateModel';
import { PieceType } from '../models/PieceModel';
import { PlayerColor } from '../models/PlayerModel';
import SquareModel from '../models/SquareModel';

export const getValidMoves = (
  board: BoardModel,
  square: SquareModel | null
): Array<CoordinateModel> => {
  if (!square || !square?.piece) return [];

  const validMoves: Array<CoordinateModel> = [];
  const { row, column } = square.coordinates;

  //   PAWN ******************************************************************
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

  //   ROOK AND QUEEN *********************************************************************
  if (
    square.piece.type === PieceType.ROOK ||
    square.piece.type === PieceType.QUEEN
  ) {
    // Move within row
    for (let i = column + 1; i < 8; i++) {
      const targetSquare = board.squares.find(
        (item) => item.coordinates.row === row && item.coordinates.column === i
      );
      if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece.color) {
          validMoves.push({ row, column: i });
        }
        break;
      } else {
        validMoves.push({ row, column: i });
      }
    }

    for (let i = column - 1; i >= 0; i--) {
      const targetSquare = board.squares.find(
        (item) => item.coordinates.row === row && item.coordinates.column === i
      );
      if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece.color) {
          validMoves.push({ row, column: i });
        }
        break;
      } else {
        validMoves.push({ row, column: i });
      }
    }

    // Move within column
    for (let i = row + 1; i < 8; i++) {
      const targetSquare = board.squares.find(
        (item) =>
          item.coordinates.row === i && item.coordinates.column === column
      );
      if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece.color) {
          validMoves.push({ row: i, column });
        }
        break;
      } else {
        validMoves.push({ row: i, column });
      }
    }

    for (let i = row - 1; i >= 0; i--) {
      const targetSquare = board.squares.find(
        (item) =>
          item.coordinates.row === i && item.coordinates.column === column
      );
      if (targetSquare?.piece) {
        if (targetSquare?.piece.color !== square.piece.color) {
          validMoves.push({ row: i, column });
        }
        break;
      } else {
        validMoves.push({ row: i, column });
      }
    }
  }

  //   KNIGHT *********************************************************************
  if (square.piece.type === PieceType.KNIGHT) {
    // Vertical
    validMoves.push({ row: row + 2, column: column + 1 });
    validMoves.push({ row: row + 2, column: column - 1 });
    validMoves.push({ row: row - 2, column: column + 1 });
    validMoves.push({ row: row - 2, column: column - 1 });

    // Horizontal
    validMoves.push({ row: row + 1, column: column + 2 });
    validMoves.push({ row: row + 1, column: column - 2 });
    validMoves.push({ row: row - 1, column: column + 2 });
    validMoves.push({ row: row - 1, column: column - 2 });

    // Validate Moves
    validMoves.push(...validMoves);
  }

  //   BISHOP AND QUEEN *********************************************************************
  if (
    square.piece.type === PieceType.BISHOP ||
    square.piece.type === PieceType.QUEEN
  ) {
    for (let i = 0; i < 8; i++) {
      validMoves.push({ row: row + i, column: column - i });
      validMoves.push({ row: row + i, column: column + i });
      validMoves.push({ row: row - i, column: column - i });
      validMoves.push({ row: row - i, column: column + i });
    }
    // Validate Moves
    validMoves.push(...validMoves);
  }

  //   KING *********************************************************************
  if (square.piece.type === PieceType.KING) {
    // Left right top bottom
    validMoves.push({ row, column: column + 1 });
    validMoves.push({ row, column: column - 1 });
    validMoves.push({ row: row + 1, column });
    validMoves.push({ row: row - 1, column });

    // Diagonal +- 1
    validMoves.push({ row: row + 1, column: column + 1 });
    validMoves.push({ row: row - 1, column: column + 1 });
    validMoves.push({ row: row + 1, column: column - 1 });
    validMoves.push({ row: row - 1, column: column - 1 });
  }

  //   RETURN VALUE
  return validMoves.filter(
    (move) =>
      move.row >= 0 &&
      move.row < 8 &&
      move.column >= 0 &&
      move.column < 8 &&
      (move.row !== row || move.column !== column)
  );

  //    return board.squares
  //         .filter(
  //           (boardSquare) =>
  //             boardSquare.coordinates.column !==
  //               selectedSquare?.coordinates.column ||
  //             boardSquare.coordinates.row !== selectedSquare?.coordinates.row
  //         )
  //         .map((boardSquare) => boardSquare.coordinates);
};
