import styled from "styled-components";
import Note from "./NotePreview";
import { NotePreview } from "@/domain/NotePreview";
import { Link } from "react-router-dom";

export type NotePreviewListProps = {
  notesPreview: Array<NotePreview>;
};

export const NotePreviewList = ({ notesPreview }: NotePreviewListProps) => (
  <NotePreviewList.OuterWrapper>
    <NotePreviewList.InnerWrapper>
      {notesPreview.map((notePreview) => (
        <NotePreviewList.Link
          key={notePreview.id}
          to={`/notes/${notePreview.id}`}
        >
          <Note notePreview={notePreview} />
        </NotePreviewList.Link>
      ))}
    </NotePreviewList.InnerWrapper>
  </NotePreviewList.OuterWrapper>
);

NotePreviewList.OuterWrapper = styled.section``;

NotePreviewList.InnerWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme: { spacing } }) => spacing.l};
`;

NotePreviewList.Link = styled(Link)`
  text-decoration: none;
`;
