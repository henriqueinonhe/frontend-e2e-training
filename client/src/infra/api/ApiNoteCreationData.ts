import { ApiNote } from "./ApiNote";

export type ApiNoteCreationData = Omit<ApiNote, "id" | "createdAt">;
