import SquareModel from '../../models/SquareModel';

import './square.css';

interface Props {
  square: SquareModel;
}

const Square = ({ square }: Props) => {
  return (
    <div
      className={`w-full h-full ${
        square.isLightSquare() ? 'bg-white' : 'bg-orange-700'
      }`}
    >
      <span>{square.getColumnCoordinates()}</span>
      <span>{square.getRowCoordinates()}</span>
      {square.piece && (
        <i
          className={`fa-solid ${square.piece.getPieceIcon()} ${
            square.piece.isWhitePiece()
              ? 'text-white icon-shadow-black'
              : 'text-black icon-shadow-white'
          }`}
        ></i>
      )}
    </div>
  );
};

export default Square;
