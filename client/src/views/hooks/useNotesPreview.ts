import { NotePreview } from "@/domain/NotePreview";
import { getNotesPreview } from "@/domain/getNotesPreview";
import { useQuery } from "@tanstack/react-query";

export const useNotesPreview = (): UseNotesPreviewReturnValue => {
  const { status, data, error, fetchStatus, refetch } = useQuery({
    queryKey: ["NotesPreview"],
    queryFn: async () => {
      try {
        return await getNotesPreview();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  return {
    status,
    notesPreview: data,
    error,
    refetch,
    fetchStatus,
  } as UseNotesPreviewReturnValue;
};

type UseQueryReturnValue = ReturnType<typeof useQuery<Array<NotePreview>>>;

export type UseNotesPreviewReturnValue = {
  refetch: UseQueryReturnValue["refetch"];
  fetchStatus: UseQueryReturnValue["fetchStatus"];
} & (
  | {
      status: "pending";
      notesPreview: undefined;
      error: null;
    }
  | {
      status: "success";
      notesPreview: Array<NotePreview>;
      error: null;
    }
  | {
      status: "error";
      notesPreview: undefined;
      error: UseQueryReturnValue["error"];
    }
);
