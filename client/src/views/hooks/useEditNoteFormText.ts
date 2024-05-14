import { useEffect, useRef, useState } from "react";
import { useNote } from "./useNote";
import { Note } from "@/domain/Note";
import { useHistory } from "react-router-dom";

export const useEditNoteFormText = (noteId: string) => {
  const history = useHistory();

  const [text, setText] = useState("");

  const { note, status: noteStatus } = useNote(noteId);

  const loadNoteText = (note: Note | undefined, status: typeof noteStatus) => {
    if (status === "pending") {
      return;
    }

    if (status === "error") {
      alert("Failed to load note, please try again!");
      history.push("/");
      return;
    }

    setText(note!.text);
  };

  const hasUnsavedData = noteStatus === "success" && text !== note.text;

  // Although I know for a fact that `history`'s
  // reference is stable, I generally do not trust
  // things I don't control
  const loadNoteTextRef = useRef(loadNoteText);
  loadNoteTextRef.current = loadNoteText;

  useEffect(() => {
    loadNoteTextRef.current(note, noteStatus);
  }, [note, noteStatus]);

  return {
    text,
    setText,
    isLoading: noteStatus === "pending",
    hasUnsavedData,
  };
};
