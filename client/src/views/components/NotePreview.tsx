import { NotePreview } from "@/domain/NotePreview";
import styled from "styled-components";
import { testIds } from "../helpers/testIds";

export type NoteProps = {
  notePreview: NotePreview;
};

export const Note = ({ notePreview }: NoteProps) => {
  const { id, title, summary } = notePreview;

  return (
    <Note.Wrapper data-testid={testIds.notePreviewCard(id)}>
      <Note.Title data-testid={testIds.notePreviewTitle(id)}>
        {title}
      </Note.Title>
      <Note.Summary data-testid={testIds.notePreviewSummary(id)}>
        {summary}
      </Note.Summary>
    </Note.Wrapper>
  );
};

Note.Wrapper = styled.article`
  background: ${({ theme: { colors } }) => colors.secondary};
  border-radius: ${({ theme: { borderRadius } }) => borderRadius.l};
  padding: ${({ theme: { spacing } }) => `${spacing.l} ${spacing.m}`};
  width: 100%;
  height: 100%;
`;

Note.Title = styled.h4`
  color: ${({ theme: { colors } }) => colors.primary};
  margin: 0;
  margin-bottom: ${({ theme: { spacing } }) => spacing.l};
`;

Note.Summary = styled.pre`
  color: ${({ theme: { colors } }) => colors.text};
  margin: 0;
  font-family: inherit;
  text-wrap: wrap;
`;

export default Note;
