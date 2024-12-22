import { useState } from 'react';
import { PlayerColor } from './models/PlayerModel';
import Board from './components/board/Board';
import BoardModel from './models/BoardModel';

function App() {
  const [board] = useState(new BoardModel());
  const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

  return (
    <>
      <h1 className="text-3xl font-bold">React Chess</h1>
      <Board board={board} playingAsWhite playerTurn={playerTurn} />
    </>
  );
}

export default App;
