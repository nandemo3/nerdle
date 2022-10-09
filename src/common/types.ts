export enum CorrectType {
  None,
  Correct,
  PartiallyCorrect,
  Incorrect,
}

export type ColumnType = 0 | 1 | 2 | 3 | 4 | 5;

export type MatrixProps = {
  value: string;
  type: CorrectType;
};
