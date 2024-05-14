import { getNoteById as apiGetNoteById } from "@/infra/api/getNoteById";
import { getToken } from "@/infra/getToken";

type Dependencies = {
  getToken: () => string;
};

export const makeGetNoteById =
  ({ getToken }: Dependencies) =>
  async (id: string) => {
    const apiNote = await apiGetNoteById(id, getToken());

    return {
      id: apiNote.id,
      title: apiNote.title,
      text: apiNote.text,
      createdAt: new Date(apiNote.createdAt),
    };
  };

export const getNoteById = makeGetNoteById({
  getToken,
});
