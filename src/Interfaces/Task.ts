export type TaskStatus = 'Yapılacak' | 'Devam Ediyor' | 'Tamamlandı';

export type TaskPriority = 'Düşük' | 'Orta' | 'Yüksek';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}
