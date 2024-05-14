import { updateNote as apiUpdateNote } from "@/infra/api/updateNote";
import { NoteUpdateData } from "./NoteUpdateData";
import { getToken } from "@/infra/getToken";

type Dependencies = {
  getToken: () => string;
};

export const makeUpdateNote =
  ({ getToken }: Dependencies) =>
  async (id: string, data: NoteUpdateData) => {
    const apiNote = await apiUpdateNote(
      id,
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

export const updateNote = makeUpdateNote({
  getToken,
});
