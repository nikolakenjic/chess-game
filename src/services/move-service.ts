import BoardModel from '../models/BoardModel';
import { CoordinateModel } from '../models/CoordinateModel';
import { PieceType } from '../models/PieceModel';
import { PlayerColor } from '../models/PlayerModel';
import SquareModel from '../models/SquareModel';

interface MoveCheck {
  move: CoordinateModel | null;
  shouldBreak: boolean;
}

interface RowColumnValidMoveCheck {
  startPos: number;
  endPos: number;
  increment: number;
  rowIncrement: number;
  columnIncrement: number;
}

const checkValidMove = (
  board: BoardModel,
  square: SquareModel,
  targetCoordinate: CoordinateModel,
  blockIfOppositeColor = false,
  blockIsEmpty = false
): MoveCheck => {
  const moveCheck: MoveCheck = {
    move: null,
    shouldBreak: false,
  };

  const targetSquare = board.getSquareOnCoordinate(targetCoordinate);

  if (targetSquare?.piece) {
    if (
      targetSquare?.piece.color !== square.piece?.color &&
      !blockIfOppositeColor
    ) {
      moveCheck.move = targetCoordinate;
    }
    moveCheck.shouldBreak = true;
  } else if (!blockIsEmpty) {
    moveCheck.move = targetCoordinate;
  }

  return moveCheck;
};

const getValidMovesForRowAndColumn = (
  board: BoardModel,
  square: SquareModel,
  {
    startPos,
    endPos,
    increment,
    rowIncrement,
    columnIncrement,
  }: RowColumnValidMoveCheck
): Array<CoordinateModel> => {
  const validMoves: Array<CoordinateModel> = [];
  const { row, column } = square.coordinates;

  for (
    let i = startPos;
    increment > 0 ? i <= endPos : i >= endPos;
    i += increment
  ) {
    const count = Math.abs(i - startPos) + 1;
    const newCoordinates: CoordinateModel = { row, column };

    if (rowIncrement) {
      newCoordinates.row = row + count * rowIncrement;
    }
    if (columnIncrement) {
      newCoordinates.column = column + count * columnIncrement;
    }

    const possibleMove = checkValidMove(board, square, newCoordinates);
    if (possibleMove.move) {
      validMoves.push(possibleMove.move);
    }

    if (possibleMove.shouldBreak) {
      break;
    }
  }

  return validMoves;
};

export const getValidMoves = (
  board: BoardModel,
  square: SquareModel | null
): Array<CoordinateModel> => {
  if (!square || !square?.piece) return [];

  const validMoves: Array<CoordinateModel | null> = [];
  const { row, column } = square.coordinates;

  //   PAWN ******************************************************************
  if (square.piece.type === PieceType.PAWN) {
    if (square.piece.color === PlayerColor.WHITE) {
      validMoves.push(
        checkValidMove(board, square, { row: row + 1, column }, true).move
      );
      validMoves.push(
        checkValidMove(
          board,
          square,
          { row: row + 1, column: column + 1 },
          false,
          true
        ).move
      );
      validMoves.push(
        checkValidMove(
          board,
          square,
          { row: row + 1, column: column - 1 },
          false,
          true
        ).move
      );
      if (row === 1) {
        validMoves.push(
          checkValidMove(board, square, { row: row + 2, column }, true).move
        );
      }
    } else {
      validMoves.push(
        checkValidMove(board, square, { row: row - 1, column }, true).move
      );
      validMoves.push(
        checkValidMove(
          board,
          square,
          { row: row - 1, column: column - 1 },
          false,
          true
        ).move
      );
      validMoves.push(
        checkValidMove(
          board,
          square,
          { row: row - 1, column: column + 1 },
          false,
          true
        ).move
      );
      if (row === 6) {
        validMoves.push(
          checkValidMove(board, square, { row: row - 2, column }, true).move
        );
      }
    }
  }

  //   ROOK AND QUEEN *********************************************************************
  if (
    square.piece.type === PieceType.ROOK ||
    square.piece.type === PieceType.QUEEN
  ) {
    // Move within row
    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: column + 1,
        endPos: 7,
        increment: 1,
        rowIncrement: 0,
        columnIncrement: 1,
      })
    );
    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: column - 1,
        endPos: 0,
        increment: -1,
        rowIncrement: 0,
        columnIncrement: -1,
      })
    );

    // Move within column
    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: row + 1,
        endPos: 7,
        increment: 1,
        rowIncrement: 1,
        columnIncrement: 0,
      })
    );
    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: row - 1,
        endPos: 0,
        increment: -1,
        rowIncrement: -1,
        columnIncrement: 0,
      })
    );
  }

  //   KNIGHT *********************************************************************
  if (square.piece.type === PieceType.KNIGHT) {
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

    // Validate Moves
    validMoves.push(...validMoves);
  }

  //   BISHOP AND QUEEN *********************************************************************
  if (
    square.piece.type === PieceType.BISHOP ||
    square.piece.type === PieceType.QUEEN
  ) {
    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: row + 1,
        endPos: 7,
        increment: 1,
        rowIncrement: 1,
        columnIncrement: -1,
      })
    );

    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: row + 1,
        endPos: 7,
        increment: 1,
        rowIncrement: 1,
        columnIncrement: 1,
      })
    );

    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: row - 1,
        endPos: 0,
        increment: -1,
        rowIncrement: -1,
        columnIncrement: -1,
      })
    );

    validMoves.push(
      ...getValidMovesForRowAndColumn(board, square, {
        startPos: row - 1,
        endPos: 0,
        increment: -1,
        rowIncrement: -1,
        columnIncrement: 1,
      })
    );

    // Validate Moves
    validMoves.push(...validMoves);
  }

  //   KING *********************************************************************
  if (square.piece.type === PieceType.KING) {
    // Left right top bottom
    validMoves.push(
      checkValidMove(board, square, { row, column: column + 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row, column: column - 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row + 1, column }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row - 1, column }).move
    );

    // Diagonal +- 1
    validMoves.push(
      checkValidMove(board, square, { row: row + 1, column: column + 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row - 1, column: column + 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row + 1, column: column - 1 }).move
    );
    validMoves.push(
      checkValidMove(board, square, { row: row - 1, column: column - 1 }).move
    );
  }

  //   RETURN VALUE
  return validMoves
    .filter((move) => !!move)
    .filter(
      (move) =>
        move.row >= 0 &&
        move.row <= 7 &&
        move.column >= 0 &&
        move.column <= 7 &&
        (move.row !== row || move.column !== column)
    );
};
