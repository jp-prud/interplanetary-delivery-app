import { useCallback, useMemo } from 'react';

import { useToastService } from '@context';
import {
  useDeleteTaskById,
  useGetTaskById,
  useListTasks
} from '@useCases';
import { useForm } from 'react-hook-form';

import { useBottomSheet, useDebounce, useGetRangeDate } from '@hooks';

import { searchFormDefaultValues } from './searchFormSchema';

export function useHomeScreen() {
  const { today } = useGetRangeDate();

  const {
    tasks,
    numberOfCompletedTasks,
    numberOfTotalTasks,
    isLoading,
    getLisTasks,
  } = useListTasks(today);

  const { showToast } = useToastService();

  const {
    task: selectedTask,
    isLoading: selectedTaskLoading,
    gatTask,
  } = useGetTaskById();

  const { bottomSheetRef } = useBottomSheet();

  const { control: searchControl, watch: searchWatch } = useForm({
    mode: 'onChange',
    defaultValues: searchFormDefaultValues,
  });


  const searchTerm = useDebounce(searchWatch('searchTerm'), 260);

  const filteredTasks = useMemo(() => {
    if (!tasks) {
      return [];
    }

    if (!searchTerm) {
      return tasks;
    }

    return tasks.filter(task =>
      task.descriptions.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tasks, searchTerm]);

  const onDetailsTask = useCallback(
    async (taskId: string) => {
      bottomSheetRef.current?.expand();
      await gatTask(taskId);
    },
    [gatTask, bottomSheetRef],
  );

  const { deleteTaskById } = useDeleteTaskById({
    onSuccess() {
      showToast({
        message: 'Task deleted',
        type: 'success',
        position: 'bottom',
      });

      bottomSheetRef.current?.close();
    },
  });

  return {
    filteredTasks,
    control: searchControl,
    searchTerm,
    numberOfCompletedTasks,
    numberOfTotalTasks,
    isLoading,
    onDetailsTask,
    getLisTasks,
    bottomSheetRef,
    selectedTask,
    selectedTaskLoading,
    deleteTaskById,
  };
}
