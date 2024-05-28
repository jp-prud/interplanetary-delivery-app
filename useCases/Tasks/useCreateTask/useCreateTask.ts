import { TaskService } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationOptions, StorageKeys, TaskProps } from '@types';

export function useCreateTask(options?: MutationOptions<void>) {
  const { createTask } = TaskService();

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<void, unknown, TaskProps>({
    mutationKey: [StorageKeys.Tasks],
    mutationFn: taskProps => createTask(taskProps),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [StorageKeys.Tasks],
      });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError(e) {
      console.log(e);

      if (options?.onError) {
        options.onError(options.errorMessage || 'An error occurred');
      }
    },
  });

  return {
    createTask: mutateAsync,
    createTaskLoading: isPending,
  };
}
