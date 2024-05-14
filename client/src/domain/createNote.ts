import { createNote as apiCreateNote } from "@/infra/api/createNote";
import { NoteCreationData } from "./NoteCreationData";
import { getToken } from "@/infra/getToken";

type Dependencies = {
  getToken: () => string;
};

export const makeCreateNote =
  ({ getToken }: Dependencies) =>
  async (data: NoteCreationData) => {
    const apiNote = await apiCreateNote(
      {
        title: data.title,
        text: data.text,
      },
      getToken(),
    );

    return {
      id: apiNote.id,
      title: apiNote.title,
      text: apiNote.text,
      createdAt: new Date(apiNote.createdAt),
    };
  };

export const createNote = makeCreateNote({
  getToken,
});
