import { NotePreview } from "@/domain/NotePreview";
import { useRef, useEffect, useState } from "react";
import { useNotesPreview } from "./useNotesPreview";
import { useHistory } from "react-router-dom";

export const useEditNoteFormTitle = (noteId: string) => {
  const [title, setTitle] = useState("");
  const history = useHistory();

  const { notesPreview, status: notesPreviewStatus } = useNotesPreview();

  const loadNoteTitle = (
    noteId: string,
    notesPreview: Array<NotePreview> | undefined,
    status: typeof notesPreviewStatus,
  ) => {
    if (status === "pending") {
      return;
    }

    if (status === "error") {
      alert("Failed to load note, please try again!");
      history.push("/");
      return;
    }

    const notePreview = notesPreview!.find((note) => note.id === noteId);

    if (!notePreview) {
      history.push("/");
      return;
    }

    setTitle(notePreview.title);
  };

  const hasUnsavedData = (() => {
    if (notesPreviewStatus !== "success") {
      return false;
    }

    const notePreview = notesPreview.find((note) => note.id === noteId);

    return title !== notePreview!.title;
  })();

  // Although I know for a fact that `history`'s
  // reference is stable, I generally do not trust
  // things I don't control
  const loadNoteTitleRef = useRef(loadNoteTitle);
  loadNoteTitleRef.current = loadNoteTitle;

  useEffect(() => {
    loadNoteTitleRef.current(noteId, notesPreview, notesPreviewStatus);
  }, [noteId, notesPreview, notesPreviewStatus]);

  return {
    title,
    setTitle,
    isLoading: notesPreviewStatus === "pending",
    hasUnsavedData,
  };
};
