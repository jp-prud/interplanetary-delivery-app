import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "@useCases";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { CreateTaskForm, createTaskFormDefaultValues } from "./createTaskFormSchema";

export function useCreateTaskForm() {
  const { createTask, createTaskLoading } = useCreateTask();

  const {
    control: createTaskControl,
    handleSubmit,
    reset,
    formState: { 
      isValid: isValidCreateTaskForm
    }
  } = useForm({
    mode: 'onSubmit',
    defaultValues: createTaskFormDefaultValues,
    resolver: zodResolver(CreateTaskForm),
  });

  const onSubmit = handleSubmit(async data => {
    await createTask({
      id: Math.random().toString(),
      ...data,
      status: 'pending',
      created_at: new Date().toISOString(),
      assigned_to: 'me',
      category: 'personal',
      due_date: '2022-12-31',
      priority: 'medium',
      tags: ['personal', 'work', 'others', 'important'],
    });

    Keyboard.dismiss();

    reset();
  });

  return {
    createTaskLoading,
    createTaskControl,
    onSubmit,
    isValidCreateTaskForm
  }
}