import MoveModel from '../models/MoveModel';

interface Props {
  moveList: Array<MoveModel>;
}

const MoveHistory = ({ moveList }: Props) => {
  return (
    <ol>
      {moveList.map((move, idx) => (
        <li key={idx}>
          <p>
            {move.piece}: {move.from.row}
            {move.from.column} -- {move.to.row}
            {move.to.column}
          </p>
        </li>
      ))}
    </ol>
  );
};

export default MoveHistory;
