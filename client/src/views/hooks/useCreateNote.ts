import { NoteCreationData } from "@/domain/NoteCreationData";
import { createNote } from "@/domain/createNote";
import { useMutation } from "@tanstack/react-query";

export const useCreateNote = () => {
  const { status, mutateAsync } = useMutation({
    mutationFn: (data: NoteCreationData) => createNote(data),
    retry: 3,
  });

  return {
    status,
    createNote: mutateAsync,
  };
};
