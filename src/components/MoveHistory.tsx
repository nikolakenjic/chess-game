import MoveModel from '../models/MoveModel';
import {pieceNotation} from "../constants/piece-info.ts";
import {columnNotation} from "../models/SquareModel.ts";

interface Props {
    moveList: Array<MoveModel>;
}

const MoveHistory = ({moveList}: Props) => {
    return (
        <section className='w-100 flex flex-wrap'>
            {moveList.map((move, idx) => (
                <span key={idx} className='textxs mx-1'>
                    {pieceNotation[move.piece]}
                    {columnNotation[move.to.column]}
                    {move.to.row + 1}
                </span>
            ))}
        </section>
    );
};

export default MoveHistory;
