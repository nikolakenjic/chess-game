import { useState } from 'react';
import { PlayerColor } from './models/PlayerModel';
import Board from './components/board/Board';
import BoardModel from './models/BoardModel';
import SquareModel from './models/SquareModel';
import MoveModel from './models/MoveModel';
import MoveHistory from './components/MoveHistory';

const App = () => {
  const [board] = useState(new BoardModel());
  const [moveHistoryList, setMoveHistoryList] = useState<Array<MoveModel>>([]);
  const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

  const movePiece = (
    currentSquare: SquareModel,
    finalSquare: SquareModel
  ): void => {
    const { piece } = currentSquare;

    if (piece) {
      board.updateSquarePiece(finalSquare.coordinates, piece);
      board.updateSquarePiece(currentSquare.coordinates, null);
      setMoveHistoryList((currentValue) => [
        ...currentValue,
        {
          from: currentSquare.coordinates,
          to: finalSquare.coordinates,
          piece: piece.type,
          color: playerTurn,
        },
      ]);

      setPlayerTurn((currentTurn) =>
        currentTurn === PlayerColor.WHITE
          ? PlayerColor.BLACK
          : PlayerColor.WHITE
      );
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">React Chess</h1>
      <Board
        board={board}
        playingAsWhite
        playerTurn={playerTurn}
        movePiece={movePiece}
      />
      <MoveHistory moveList={moveHistoryList} />
    </>
  );
};

export default App;
