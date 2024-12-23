import { useMemo } from 'react';
import SquareModel from '../../models/SquareModel';

import './square.css';

interface Props {
  square: SquareModel;
  showCoordinatesRow?: boolean;
  showCoordinatesColumn?: boolean;
  showAsValidMove?: boolean;
  isSelected?: boolean;
  canSelect?: boolean;
  select: (square: SquareModel) => void;
}

const Square = ({
  square,
  showCoordinatesRow,
  showCoordinatesColumn,
  showAsValidMove,
  isSelected,
  canSelect,
  select,
}: Props) => {
  const backgroundColor = useMemo(() => {
    if (isSelected) {
      return 'bg-gray-400';
    }
    return square.isLightSquare() ? 'bg-white' : 'bg-orange-700';
  }, [isSelected, square]);

  const onClick = () => {
    if (canSelect) {
      select(square);
    }
  };

  return (
    <div
      className={`relative w-full h-full flex justify-center items-center hover:cursor-pointer ${backgroundColor}`}
      onClick={onClick}
    >
      {showCoordinatesColumn && (
        <span className="absolute bottom-1 right-1 text-xs text-gray-700">
          {square.getColumnCoordinates()}
        </span>
      )}

      {showCoordinatesRow && (
        <span className="absolute top-1 left-1 text-xs text-gray-700">
          {square.getRowCoordinates()}
        </span>
      )}

      {showAsValidMove && (
        <span
          className={`rounded-full ${
            square.piece
              ? 'w-12 h-12 border-2 border-gray-400 absolute'
              : 'bg-gray-400 w-4 h-4'
          }`}
        />
      )}

      {square.piece && (
        <i
          className={`fa-solid fa-sharp fa-2xl ${square.piece.getPieceIcon()} ${
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
