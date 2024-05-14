import { deleteNote as apiDeleteNote } from "@/infra/api/deleteNote";
import { getToken } from "@/infra/getToken";

type Dependencies = {
  getToken: () => string;
};

export const makeDeleteNote =
  ({ getToken }: Dependencies) =>
  async (id: string) => {
    await apiDeleteNote(id, getToken());
  };

export const deleteNote = makeDeleteNote({
  getToken,
});
