import {useState} from 'react';
import {PlayerColor} from './models/PlayerModel';
import Board from './components/board/Board';
import BoardModel from './models/BoardModel';
import SquareModel from './models/SquareModel';
import {MoveHistoryModel, MoveModel, MoveType} from './models/MoveModel';
import MoveHistory from './components/MoveHistory';

const App = () => {
    const [board] = useState(new BoardModel());
    const [moveHistoryList, setMoveHistoryList] = useState<Array<MoveHistoryModel>>([]);
    const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

    const movePiece = (
        currentSquare: SquareModel,
        finalSquare: SquareModel,
        move:MoveModel | undefined
    ): void => {
        const {piece} = currentSquare;

        if (piece) {
            piece.setHasMoved(true)
            board.updateSquarePiece(finalSquare.coordinates, piece);
            board.updateSquarePiece(currentSquare.coordinates, null);
            if(move?.type === MoveType.CASTLE_KING_SIDE) {
                //     todo
                const kingRow = piece.isWhitePiece() ? 0 : 7
                const rookColumn = 7
                const rookPiece = board.getSquareOnCoordinate({row:kingRow, column:rookColumn})?.piece
                rookPiece?.setHasMoved(true)
                board.updateSquarePiece({row:kingRow, column: 5}, rookPiece || null);
                board.updateSquarePiece({row:kingRow, column:rookColumn}, null)
            }
            if(move?.type === MoveType.CASTLE_QUEEN_SIDE) {
                //     Todo
            }


            setMoveHistoryList((currentValue) => [
                ...currentValue,
                {
                    from: currentSquare.coordinates,
                    to: finalSquare.coordinates,
                    piece: piece.type,
                    color: playerTurn,
                    captured: finalSquare.piece?.type
                },
            ]);

            setPlayerTurn((currentTurn) =>
                currentTurn === PlayerColor.WHITE
                    ? PlayerColor.BLACK
                    : PlayerColor.WHITE
            );
        }
    };

    return (
        <div className="max-w-3xl w-3/4  my-4 mx-auto ">
            <Board
                board={board}
                playingAsWhite
                playerTurn={playerTurn}
                movePiece={movePiece}
            />
            <MoveHistory moveList={moveHistoryList}/>
        </div>
    );
};

export default App;
