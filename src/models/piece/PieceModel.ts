import {pieceIcons, PieceType} from '../../constants/piece-info';
import BoardModel from '../BoardModel';
import {PlayerColor} from '../PlayerModel';
import SquareModel from '../SquareModel';
import {MoveModel} from "../MoveModel.ts";

export default abstract class PieceModel {
    readonly type: PieceType;
    readonly color: PlayerColor;
    hasMoved: boolean;

    constructor(type: PieceType, color: PlayerColor) {
        this.type = type;
        this.color = color;
        this.hasMoved = false
    }

    getPieceIcon(): string {
        return pieceIcons[this.type];
    }

    isWhitePiece(): boolean {
        return this.color === PlayerColor.WHITE;
    }

    setHasMoved = (newState: boolean) => {
        this.hasMoved = newState
    }

    abstract getValidMoves(
        board: BoardModel,
        square: SquareModel
    ): Array<MoveModel | null>;
}
