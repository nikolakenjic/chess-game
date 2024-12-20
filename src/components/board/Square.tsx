import SquareModel from '../../models/SquareModel';
import { getSquareCoordinates } from '../../services/square-service';

interface Props {
  square: SquareModel;
}

const Square = ({ square }: Props) => {
  return (
    <>
      <span>{getSquareCoordinates(square)}</span>
    </>
  );
};

export default Square;
