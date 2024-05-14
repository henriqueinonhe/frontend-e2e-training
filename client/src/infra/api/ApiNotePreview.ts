import { ApiNote } from "./ApiNote";

export type ApiNotePreview = Omit<ApiNote, "text"> & {
  summary: string;
};
