import { Task } from '../Interfaces/Task';

export const STORAGE_KEY = 'task-manager-items';

export const getTasksFromStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);

  if (!storedTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(storedTasks) as Task[];

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks;
  } catch (error) {
    console.error('Görevler okunurken hata oluştu:', error);
    return [];
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
