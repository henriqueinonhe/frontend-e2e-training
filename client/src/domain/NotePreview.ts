import { Note } from "./Note";

export type NotePreview = Omit<Note, "text"> & {
  summary: string;
};
