export type TaskStatus = 'completed' | 'pending';

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory = 'work' | 'personal' | 'others';

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  created_at: string;
  due_date: string;
  assigned_to: string;
  tags?: string[];
  note?: string;
  comments?: TaskComments[];
}

interface TaskComments {
  id: string;
  content: string;
  created_at: string;
}

export interface CompleteTaskDTO {
  id: string;
}

// export interface CreateTaskDTO {
//   content: string;
//   priority: TaskPriority;
//   category: TaskCategory;
//   due_date: string;
//   assigned_to: string;
//   tags: string[];
//   notes: string;
// }
