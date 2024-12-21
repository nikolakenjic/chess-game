import BoardModel from '../../models/BoardModel';
import SquareModel from '../../models/SquareModel';
import Square from './Square';

interface Props {
  board: BoardModel;
  playingAsWhite: boolean;
}

const Board = ({ board, playingAsWhite }: Props) => {
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
            <Square square={square} />
          </div>
        ))}
      </section>
    </>
  );
};

export default Board;
