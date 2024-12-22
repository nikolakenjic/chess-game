import { CoordinateModel } from './CoordinateModel';
import PieceModel from './PieceModel';

const columnNotation: Record<number, string> = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h',
};

export default class SquareModel {
  coordinates: CoordinateModel;
  piece: PieceModel;

  constructor(row: number, column: number) {
    this.coordinates = { row, column };
  }

  setPiece(piece: PieceModel): void {
    this.piece = piece;
  }

  getColumnCoordinates(): string {
    return `${columnNotation[this.coordinates.column]}`;
  }

  getRowCoordinates(): string {
    return `${this.coordinates.row + 1}`;
  }

  isLightSquare(): boolean {
    return (this.coordinates.column + this.coordinates.row) % 2 !== 0;
  }
}
