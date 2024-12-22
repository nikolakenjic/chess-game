import { useCallback, useMemo, useState } from 'react';
import BoardModel from '../../models/BoardModel';
import SquareModel from '../../models/SquareModel';
import { PlayerColor } from '../../models/PlayerModel';
import Square from './Square';

interface Props {
  board: BoardModel;
  playerTurn: PlayerColor;
  playingAsWhite: boolean;
}

const Board = ({ board, playerTurn, playingAsWhite }: Props) => {
  const [selectedSquare, setSelectedSquare] = useState<SquareModel | null>(
    null
  );
  const validMoves: Array<SquareModel> = useMemo(() => {
    return board.squares.filter((boardSquare) => {
      if (!selectedSquare) return [];
      return (
        boardSquare.column !== selectedSquare?.column ||
        boardSquare.row !== selectedSquare?.row
      );
    });
  }, [board, selectedSquare]);

  const isValidMove = useCallback(
    (square: SquareModel): boolean => {
      return validMoves.some(
        (validMoveSquare) =>
          validMoveSquare.column === square.column &&
          validMoveSquare.row === square.row
      );
    },
    [validMoves]
  );

  return (
    <>
      <section className="grid grid-rows-8 grid-cols-8 max-w-3xl w-3/4 aspect-square my-4 mx-auto border shadow">
        {board.squares.map((square: SquareModel) => (
          <div
            className={`w-full h-full col-start-${
              playingAsWhite ? square.column + 1 : 8 - square.column
            } row-start-${playingAsWhite ? 8 - square.row : square.row + 1}`}
            key={`square_${square.row}_${square.column}`}
          >
            <Square
              square={square}
              showCoordinatesColumn={square.row === 0}
              showCoordinatesRow={square.column === 0}
              showAsValidMove={isValidMove(square)}
              isSelected={
                square.row === selectedSquare?.row &&
                square.column === selectedSquare?.column
              }
              canSelect={
                square.piece?.color === playerTurn || isValidMove(square)
              }
              select={setSelectedSquare}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default Board;
