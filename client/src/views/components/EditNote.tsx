import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NoteForm } from "./NoteForm";
import { useNotesPreview } from "../hooks/useNotesPreview";
import { useUpdateNote } from "../hooks/useUpdateNote";
import { useEditNoteFormTitle } from "../hooks/useEditNoteFormTitle";
import { useEditNoteFormText } from "../hooks/useEditNoteFormText";
import { testIds } from "../helpers/testIds";
import { ConfirmationPrompt } from "./ConfirmationPrompt";

export const EditNote = () => {
  const history = useHistory();
  const { id: noteId } = useParams<{ id: string }>();

  const { refetch } = useNotesPreview();
  const { status: updateNoteStatus, updateNote } = useUpdateNote();

  const {
    title,
    setTitle,
    isLoading: isTitleLoading,
    hasUnsavedData: hasUnsavedTitle,
  } = useEditNoteFormTitle(noteId);

  const {
    text,
    setText,
    isLoading: isTextLoading,
    hasUnsavedData: hasUnsavedText,
  } = useEditNoteFormText(noteId);

  const [showConfirmationPrompt, setShowConfirmationPrompt] = useState(false);

  const handleCancel = () => {
    const hasUnsavedData = hasUnsavedTitle || hasUnsavedText;

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
      await updateNote({
        id: noteId,
        data: {
          title: trimmedTitle,
          text: trimmedText,
        },
      });
    } catch {
      alert("Failed to update note, please try again!");
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
        isSubmitting={updateNoteStatus === "pending"}
        isTitleLoading={isTitleLoading}
        isTextLoading={isTextLoading}
        data-testid={testIds.editNoteForm}
      />

      {showConfirmationPrompt && (
        <ConfirmationPrompt
          data-testid={testIds.editNoteConfirmationPrompt}
          prompt="Are you sure you want to cancel? Your changes will not be saved."
          onNo={handleConfirmationPromptNo}
          onYes={handleConfirmationPromptYes}
        />
      )}
    </>
  );
};
