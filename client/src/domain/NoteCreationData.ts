import { Note } from "./Note";

export type NoteCreationData = Omit<Note, "id" | "createdAt">;
