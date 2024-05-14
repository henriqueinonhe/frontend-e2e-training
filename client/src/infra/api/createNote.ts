import { httpClient } from "../httpClient";
import { ApiNoteCreationData } from "./ApiNoteCreationData";
import { ApiNote } from "./ApiNote";

export const createNote = async (data: ApiNoteCreationData, token: string) => {
  return await httpClient.request<ApiNote>("/notes", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
