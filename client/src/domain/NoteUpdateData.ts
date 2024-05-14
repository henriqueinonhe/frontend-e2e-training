import { Note } from "./Note";

export type NoteUpdateData = Omit<Note, "id" | "createdAt">;
