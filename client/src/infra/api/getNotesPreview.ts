import { httpClient } from "../httpClient";
import { ApiNotePreview } from "./ApiNotePreview";

export const getNotesPreview = async (
  token: string,
): Promise<Array<ApiNotePreview>> => {
  return await httpClient.request<Array<ApiNotePreview>>("/notes/preview", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
