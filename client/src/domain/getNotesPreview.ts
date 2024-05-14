import { getNotesPreview as apiGetNotesPreview } from "@/infra/api/getNotesPreview";
import { NotePreview } from "./NotePreview";
import { getToken } from "@/infra/getToken";

type Dependencies = {
  getToken: () => string;
};

export const makeGetNotesPreview =
  ({ getToken }: Dependencies) =>
  async (): Promise<Array<NotePreview>> => {
    const apiNotesPreview = await apiGetNotesPreview(getToken());

    const notesPreview = apiNotesPreview.map((apiNotePreview) => ({
      id: apiNotePreview.id,
      title: apiNotePreview.title,
      summary: apiNotePreview.summary,
      createdAt: new Date(apiNotePreview.createdAt),
    }));

    return notesPreview;
  };

export const getNotesPreview = makeGetNotesPreview({
  getToken,
});
