import {useCallback, useMemo, useState} from 'react';
import BoardModel from '../../models/BoardModel';
import SquareModel from '../../models/SquareModel';
import {PlayerColor} from '../../models/PlayerModel';
import Square from './Square';
import {getValidMoves} from '../../services/move-service';
import {MoveModel} from "../../models/MoveModel.ts";

interface Props {
    board: BoardModel;
    playerTurn: PlayerColor;
    playingAsWhite: boolean;
    movePiece: (currentSquare: SquareModel, finalSquare: SquareModel, move:MoveModel | undefined) => void;
}

const Board = ({board, playerTurn, playingAsWhite, movePiece}: Props) => {
    const [selectedSquare, setSelectedSquare] = useState<SquareModel | null>(
        null
    );
    const validMoves: Array<MoveModel> = useMemo(() => {
        return getValidMoves(board, selectedSquare);
    }, [board, selectedSquare]);

    const isValidMove = useCallback(
        (square: SquareModel): boolean => {
            return validMoves.some(
                (validMoveCoordinates) =>
                    validMoveCoordinates.column === square.coordinates.column &&
                    validMoveCoordinates.row === square.coordinates.row
            );
        },
        [validMoves]
    );

    const getMove = useCallback(
        (square: SquareModel): MoveModel | undefined => {
            return validMoves.find(
                (validMoveCoordinates) =>
                    validMoveCoordinates.column === square.coordinates.column &&
                    validMoveCoordinates.row === square.coordinates.row
            );
        },
        [validMoves]
    );

    const isSameSelectedSquare = (square: SquareModel): boolean => {
        return (
            square.coordinates.row === selectedSquare?.coordinates.row &&
            square.coordinates.column === selectedSquare?.coordinates.column
        );
    };

    const selectSquare = (square: SquareModel) => {
        if (selectedSquare && isValidMove(square)) {
            if (!isSameSelectedSquare(square)) {
                movePiece(selectedSquare, square, getMove(square));
            }
            setSelectedSquare(null);
        } else {
            setSelectedSquare(square);
        }
    };

    return (
        <>
            <section className="grid grid-rows-8 grid-cols-8 w-100 aspect-square my-2 mx-auto border shadow">
                {board.squares.map((square: SquareModel) => (
                    <div
                        className={`w-full h-full col-start-${
                            playingAsWhite
                                ? square.coordinates.column + 1
                                : 8 - square.coordinates.column
                        } row-start-${
                            playingAsWhite
                                ? 8 - square.coordinates.row
                                : square.coordinates.row + 1
                        }`}
                        key={`square_${square.coordinates.row}_${square.coordinates.column}`}
                    >
                        <Square
                            square={square}
                            showCoordinatesColumn={square.coordinates.row === 0}
                            showCoordinatesRow={square.coordinates.column === 0}
                            showAsValidMove={isValidMove(square)}
                            isSelected={
                                square.coordinates.row === selectedSquare?.coordinates.row &&
                                square.coordinates.column === selectedSquare?.coordinates.column
                            }
                            canSelect={
                                square.piece?.color === playerTurn || isValidMove(square)
                            }
                            select={selectSquare}
                        />
                    </div>
                ))}
            </section>
        </>
    );
};

export default Board;
