import { TaskService } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationOptions, StorageKeys } from '@types';

export function useDeleteTaskById({
  errorMessage,
  onError,
  onSuccess,
}: MutationOptions<void>) {
  const { deleteTaskById: deleteTaskByIdService } = TaskService();
  const queryClient = useQueryClient();

  const { mutate: deleteTaskById } = useMutation<void, unknown, string>({
    mutationKey: [StorageKeys.Tasks],
    mutationFn: taskId => deleteTaskByIdService(taskId),
    onError() {
      if (onError) {
        onError(errorMessage || 'An error occurred while deleting the task');
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [StorageKeys.Tasks],
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return {
    deleteTaskById,
  };
}
