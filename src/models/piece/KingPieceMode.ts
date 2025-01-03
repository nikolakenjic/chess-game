import {PieceType} from '../../constants/piece-info';
import {checkValidMove} from '../../services/move-service';
import BoardModel from '../BoardModel';
import {PlayerColor} from '../PlayerModel';
import SquareModel from '../SquareModel';
import PieceModel from './PieceModel';
import {MoveModel} from "../MoveModel.ts";

export default class KingPieceModel extends PieceModel {
    constructor(color: PlayerColor) {
        super(PieceType.KING, color);
    }

    getValidMoves = (
        board: BoardModel,
        square: SquareModel
    ): Array<MoveModel | null> => {
        const validMoves: Array<MoveModel | null> = [];
        const {row, column} = square.coordinates;

        // Left right top bottom
        validMoves.push(
            checkValidMove(board, square, {row, column: column + 1}).move
        );
        validMoves.push(
            checkValidMove(board, square, {row, column: column - 1}).move
        );
        validMoves.push(
            checkValidMove(board, square, {row: row + 1, column}).move
        );
        validMoves.push(
            checkValidMove(board, square, {row: row - 1, column}).move
        );

        // Diagonal +- 1
        validMoves.push(
            checkValidMove(board, square, {row: row + 1, column: column + 1}).move
        );
        validMoves.push(
            checkValidMove(board, square, {row: row - 1, column: column + 1}).move
        );
        validMoves.push(
            checkValidMove(board, square, {row: row + 1, column: column - 1}).move
        );
        validMoves.push(
            checkValidMove(board, square, {row: row - 1, column: column - 1}).move
        );

        // Castle
        if (!this.hasMoved) {
            const kingRow = this.isWhitePiece() ? 0 : 7
            //     King side
            const squareRookKing = board.getSquareOnCoordinate({row: kingRow, column: 7})
            const squareRookKingPiece = squareRookKing?.piece;
            if (squareRookKingPiece && squareRookKingPiece.type === PieceType.ROOK && !squareRookKingPiece.hasMoved) {
                validMoves.push({row: kingRow, column: 6});
            }
        }

        return validMoves;
    };
}
