import { httpClient } from "../httpClient";
import { ApiNote } from "./ApiNote";

export const getNoteById = async (id: string, token: string) => {
  return await httpClient.request<ApiNote>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
