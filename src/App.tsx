import { useState } from 'react';
import Board from './components/board/Board';
import BoardModel from './models/BoardModel';

function App() {
  const [board] = useState(new BoardModel());

  return (
    <>
      <h1 className="text-3xl font-bold">React Chess</h1>
      <Board board={board} playingAsWhite />
    </>
  );
}

export default App;
