import { useState } from 'react';
import { PlayerColor } from './models/PlayerModel';
import Board from './components/board/Board';
import BoardModel from './models/BoardModel';
import SquareModel from './models/SquareModel';

function App() {
  const [board] = useState(new BoardModel());
  const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

  const movePiece = (
    currentSquare: SquareModel,
    finalSquare: SquareModel
  ): void => {
    board.updateSquarePiece(finalSquare.coordinates, currentSquare.piece);
    board.updateSquarePiece(currentSquare.coordinates, null);

    setPlayerTurn((currentTurn) =>
      currentTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE
    );
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
    </>
  );
}

export default App;
