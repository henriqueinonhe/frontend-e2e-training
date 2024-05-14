import { Note } from "@/domain/Note";
import { getNoteById } from "@/domain/getNoteById";
import { useQuery } from "@tanstack/react-query";

export const useNote = (id: string): UseNoteReturnValue => {
  const { data, status, refetch, error } = useQuery({
    queryKey: ["Note", id],
    queryFn: () => getNoteById(id),
  });

  return {
    note: data,
    status,
    refetch,
    error,
  } as UseNoteReturnValue;
};

type UseQueryReturnValue = ReturnType<typeof useQuery<Note>>;

export type UseNoteReturnValue = {
  refetch: UseQueryReturnValue["refetch"];
} & (
  | {
      status: "pending";
      note: undefined;
      error: null;
    }
  | {
      status: "success";
      note: Note;
      error: null;
    }
  | {
      status: "error";
      note: undefined;
      error: UseQueryReturnValue["error"];
    }
);
