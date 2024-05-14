import { httpClient } from "../httpClient";
import { ApiNote } from "./ApiNote";
import { ApiNoteUpdateData } from "./ApiNoteUpdateData";

export const updateNote = async (
  id: string,
  data: ApiNoteUpdateData,
  token: string,
) => {
  return await httpClient.request<ApiNote>(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
