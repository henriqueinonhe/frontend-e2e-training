import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCreateNote } from "../hooks/useCreateNote";
import { useNotesPreview } from "../hooks/useNotesPreview";
import { NoteForm } from "./NoteForm";
import { testIds } from "../helpers/testIds";
import { ConfirmationPrompt } from "./ConfirmationPrompt";

export const AddNote = () => {
  const history = useHistory();
  const { createNote, status: createNoteStatus } = useCreateNote();
  const { refetch } = useNotesPreview();

  const initialTitle = "";
  const initialText = "";

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);

  const handleCancel = () => {
    const hasUnsavedData = title !== initialTitle || text !== initialText;

    if (hasUnsavedData) {
      setShowConfirmationPrompt(true);
      return;
    }

    history.push("/");
  };

  const handleConfirmationPromptNo = () => {
    setShowConfirmationPrompt(false);
  };

  const handleConfirmationPromptYes = () => {
    setShowConfirmationPrompt(false);
    history.push("/");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedText = text.trim();

    if (!trimmedTitle) {
      alert(
        "Note title cannot be empty or composed of only whitespace characters!",
      );
      return;
    }

    if (!trimmedText) {
      alert(
        "Note text cannot be empty or composed of only whitespace characters!",
      );
      return;
    }

    try {
      await createNote({
        title: trimmedTitle,
        text: trimmedText,
      });
    } catch {
      alert("Failed to create note, please try again!");

      return;
    }

    history.push("/");

    await refetch();
  };

  // Note: Both of these are modals, which is not very nice
  // UX wise, and also, they should somehow take the zIndex as
  // argument, but for now we'll be relying on the fact that for stacking
  // contexts, if the z-index is the same for two elements,
  // those who come later in the DOM will be on top of those who come earlier.

  return (
    <>
      <NoteForm
        title={title}
        onTitleChange={setTitle}
        text={text}
        onTextChange={setText}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createNoteStatus === "pending"}
        data-testid={testIds.addNoteForm}
      />

      {showConfirmationPrompt && (
        <ConfirmationPrompt
          data-testid={testIds.addNoteConfirmationPrompt}
          prompt="Are you sure you want to cancel? Your changes will not be saved."
          onNo={handleConfirmationPromptNo}
          onYes={handleConfirmationPromptYes}
        />
      )}
    </>
  );
};
