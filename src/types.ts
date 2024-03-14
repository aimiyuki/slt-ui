export type Status = "added" | "removed" | "unchanged";
export type Word = {
  status: Status;
  surface: string;
};
export type Sentence = Word[];
