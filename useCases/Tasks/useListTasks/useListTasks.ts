import { TaskService } from '@services';
import { useQuery } from '@tanstack/react-query';
import { StorageKeys } from '@types';

export function useListTasks(date?: string) {
  const { listTasks } = TaskService();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [StorageKeys.Tasks],
    queryFn: () => listTasks(date),
  });

  return {
    tasks: data,
    numberOfCompletedTasks: 10,
    numberOfTotalTasks: 10,
    isLoading,
    isError,
    error,
    getLisTasks: refetch,
  };
}
