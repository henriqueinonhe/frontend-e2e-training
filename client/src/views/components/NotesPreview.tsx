import styled from "styled-components";
import { useNotesPreview } from "../hooks/useNotesPreview";
import { NotePreviewList } from "./NotePreviewList";

export const NotesPreview = () => {
  const { status, notesPreview } = useNotesPreview();

  return (
    <NotesPreview.Wrapper>
      <NotesPreview.Title>Notes</NotesPreview.Title>
      {status === "pending" && <LoadingState />}
      {status === "success" && !notesPreview.length && <EmptyState />}
      {status === "success" && !!notesPreview.length && (
        <NotePreviewList notesPreview={notesPreview} />
      )}
      {status === "error" && <ErrorState />}
    </NotesPreview.Wrapper>
  );
};

const LoadingState = () => (
  <NotesPreview.LoadingState>Loading...</NotesPreview.LoadingState>
);

const EmptyState = () => (
  <NotesPreview.EmptyState>Nothing to show</NotesPreview.EmptyState>
);

const ErrorState = () => (
  <NotesPreview.ErrorState>
    Something went wrong, please refresh the page
  </NotesPreview.ErrorState>
);

NotesPreview.LoadingState = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${({ theme: { colors } }) => colors.primary};
`;

NotesPreview.EmptyState = styled.p`
  color: ${({ theme: { colors } }) => colors.primary};
`;

NotesPreview.ErrorState = styled.p`
  color: ${({ theme: { colors } }) => colors.primary};
`;

NotesPreview.Wrapper = styled.section``;

NotesPreview.Title = styled.h3`
  margin: 0;
  padding-bottom: ${({ theme: { spacing } }) => spacing.l};
`;

export default NotesPreview;
