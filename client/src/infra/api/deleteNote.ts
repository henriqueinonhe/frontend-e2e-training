import { httpClient } from "../httpClient";

export const deleteNote = async (id: string, token: string) => {
  return await httpClient.request<void>(`/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
