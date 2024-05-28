import { TaskService } from '@services';
import { useMutation } from '@tanstack/react-query';
import { StorageKeys, TaskProps } from '@types';

export function useGetTaskById() {
  const { getTaskById } = TaskService();

  const {
    data: task,
    isPending,
    isError,
    mutate,
  } = useMutation<TaskProps | undefined, unknown, string>({
    mutationKey: [StorageKeys.Tasks],
    mutationFn: taskId => getTaskById(taskId),
  });

  return {
    task,
    isLoading: isPending,
    isError,
    gatTask: mutate,
  };
}
