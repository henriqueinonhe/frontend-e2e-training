import { FormEvent } from "react";
import styled from "styled-components";
import { Modal } from "./Modal";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import { testIds } from "../helpers/testIds";

export type NoteFormProps = {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
  title: string;
  onTitleChange?: (value: string) => void;
  isTitleLoading?: boolean;
  text: string;
  onTextChange?: (value: string) => void;
  isTextLoading?: boolean;
  "data-testid"?: string;
};

export const NoteForm = ({
  onSubmit,
  isSubmitting,
  onCancel,
  text,
  title,
  onTextChange,
  onTitleChange,
  isTextLoading,
  isTitleLoading,
  "data-testid": dataTestId,
}: NoteFormProps) => {
  const isDisabled = isSubmitting || isTextLoading || isTitleLoading;

  return (
    <Modal
      onClickOutside={() => {
        !isSubmitting && onCancel?.();
      }}
    >
      <NoteForm.Form onSubmit={onSubmit} data-testid={dataTestId}>
        <NoteForm.TitleInputContainer>
          {isTitleLoading ? (
            <div>Loading...</div>
          ) : (
            <TextInput
              value={title}
              onChange={onTitleChange}
              label="Title"
              disabled={isDisabled}
              data-testid={testIds.noteFormTitleInput(dataTestId)}
            />
          )}
        </NoteForm.TitleInputContainer>

        <NoteForm.TextAreaContainer>
          {isTextLoading ? (
            <div>Loading...</div>
          ) : (
            <TextArea
              value={text}
              onChange={onTextChange}
              label="Text"
              disabled={isDisabled}
              data-testid={testIds.noteFormTextInput(dataTestId)}
            />
          )}
        </NoteForm.TextAreaContainer>

        <NoteForm.ButtonRow>
          <NoteForm.CancelButton
            type="button"
            onClick={onCancel}
            // We still want to let the user exit
            // the form even if there's stuff loading
            // but if it's submitting, as we
            // currently won't cancel the operation
            // we simply force the user to wait for submission
            disabled={isSubmitting}
            data-testid={testIds.noteFormCancelButton(dataTestId)}
          >
            Cancel
          </NoteForm.CancelButton>

          <NoteForm.SaveButton
            type="submit"
            disabled={isDisabled}
            data-testid={testIds.noteFormSaveButton(dataTestId)}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </NoteForm.SaveButton>
        </NoteForm.ButtonRow>
      </NoteForm.Form>
    </Modal>
  );
};

NoteForm.Form = styled.form`
  background-color: ${({ theme }) => theme.colors.tertiary};
  width: 500px;
  height: 500px;
  padding: ${({ theme: { spacing } }) => `${spacing.xl}`};
  display: flex;
  flex-direction: column;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    width: 100%;
    height: 100%;
  }
`;

NoteForm.TitleInputContainer = styled.div``;

NoteForm.TextAreaContainer = styled.div`
  margin-top: ${({ theme: { spacing } }) => spacing.xl};
  flex-grow: 1;
`;

NoteForm.ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme: { spacing } }) => spacing.xl};
`;

NoteForm.CancelButton = styled.button``;

NoteForm.SaveButton = styled.button``;
