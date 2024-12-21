import SquareModel from '../../models/SquareModel';
import { getPieceIcon } from '../../piece-service';
import {
  getSquareCoordinates,
  isLightSquare,
} from '../../services/square-service';

interface Props {
  square: SquareModel;
}

const Square = ({ square }: Props) => {
  return (
    <div
      className={`w-full h-full ${
        isLightSquare(square) ? 'bg-white' : 'bg-orange-700'
      }`}
    >
      <span>{getSquareCoordinates(square)}</span>
      {square.piece && (
        <i className={`fa-solid ${getPieceIcon(square.piece)}`}></i>
      )}
    </div>
  );
};

export default Square;
