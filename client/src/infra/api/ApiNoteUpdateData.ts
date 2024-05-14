import { ApiNote } from "./ApiNote";

export type ApiNoteUpdateData = Omit<ApiNote, "id" | "createdAt">;
