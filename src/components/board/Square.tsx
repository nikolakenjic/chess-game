import SquareModel from '../../models/SquareModel';
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
    </div>
  );
};

export default Square;
