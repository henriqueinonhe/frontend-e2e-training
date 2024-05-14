import { NoteUpdateData } from "@/domain/NoteUpdateData";
import { updateNote } from "@/domain/updateNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateNote = () => {
  type UpdateNoteMutationParameters = {
    id: string;
    data: NoteUpdateData;
  };

  const queryClient = useQueryClient();
  const { status, mutateAsync } = useMutation({
    mutationFn: ({ id, data }: UpdateNoteMutationParameters) =>
      updateNote(id, data),
    retry: 3,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({
        queryKey: ["Note", id],
      });
    },
  });

  return {
    status,
    updateNote: mutateAsync,
  };
};
